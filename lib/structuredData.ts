// JSON-LD Structured Data builders
// Centralizes schema generation for reusability & testability.

export interface CourseInput {
  name: string;
  description: string;
  providerName: string;
  providerURL: string;
  startDate: string; // ISO (YYYY-MM-DD)
  endDate: string;   // ISO
  // Accept raw courseMode which may include cohort parentheses e.g. "hybrid (September 2025 Cohort)"
  courseMode: string;
  courseWorkload?: string;
  locationName: string;
  streetAddress: string;
  addressLocality: string;
  addressCountry: string; // ISO 2 code
  instructorName: string;
  offerURL: string;
  price: number;
  priceCurrency: string;
  availability: string; // Schema URL e.g. https://schema.org/InStock
  offerCategory: string;
}

export function buildCourseJsonLd(course: CourseInput) {
  // Sanitize courseMode to a valid Schema.org enum, defaulting to 'hybrid'.
  const rawMode = course.courseMode.trim().toLowerCase();
  const allowedModes = ['online', 'offline', 'onsite', 'hybrid'];
  let mode: 'online' | 'offline' | 'onsite' | 'hybrid' = 'hybrid'; // Default value
  for (const validMode of allowedModes) {
    if (rawMode.startsWith(validMode)) {
      mode = validMode as 'online' | 'offline' | 'onsite' | 'hybrid';
      break;
    }
  }

  // Extract cohort info if embedded in courseMode (e.g., "hybrid (September 2025 Cohort)")
  let extractedCohort: string | undefined;
  const cohortPattern = /\(([^)]+)\)/;
  const match = rawMode.match(cohortPattern);
  if (match) {
    extractedCohort = match[1].trim();
  }

  // Convert human readable workload like "6 weeks" to ISO 8601 duration "P6W"
  let courseWorkloadISO: string | undefined = undefined;
  if (course.courseWorkload) {
    const weeksMatch = course.courseWorkload.match(/(\d+)\s*week/i);
    if (weeksMatch) {
      courseWorkloadISO = `P${weeksMatch[1]}W`;
    }
  }

  // Build instance name. If a cohort was explicitly supplied, append it.
  let instanceName: string;
  if (extractedCohort) {
    // Avoid double-appending if name already contains the cohort text
    instanceName = course.name.includes(extractedCohort)
      ? course.name
      : `${course.name} (${extractedCohort})`;
  } else {
    // Derive cohort from start date (Month YYYY Cohort)
    const autoCohort =
      new Date(course.startDate).toLocaleString('en-ET', {
        month: 'long',
        year: 'numeric',
      }) + ' Cohort';
    instanceName = course.name.includes(autoCohort)
      ? course.name
      : `${course.name} (${autoCohort})`;
  }

  return {
    '@type': 'Course',
    name: course.name,
    description: course.description,
    provider: {
      '@type': 'Organization',
      name: course.providerName,
      sameAs: course.providerURL,
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      name: instanceName,
      courseMode: mode,
      startDate: course.startDate,
      endDate: course.endDate,
      ...(courseWorkloadISO ? { courseWorkload: courseWorkloadISO } : {}),
      location: {
        '@type': 'Place',
        name: course.locationName,
        address: {
          '@type': 'PostalAddress',
          streetAddress: course.streetAddress,
          addressLocality: course.addressLocality,
          addressCountry: course.addressCountry,
        },
      },
      instructor: {
        '@type': 'Person',
        name: course.instructorName,
      },
      offers: {
        '@type': 'Offer',
        url: course.offerURL,
        price: course.price,
        priceCurrency: course.priceCurrency,
        availability: course.availability,
        validFrom: new Date().toISOString(),
        category: course.offerCategory,
      },
    },
  } as const;
}
