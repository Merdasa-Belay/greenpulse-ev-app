// JSON-LD Structured Data builders
// Centralizes schema generation for reusability & testability.

export interface CourseInput {
  name: string;
  description: string;
  providerName: string;
  providerURL: string;
  startDate: string; // ISO (YYYY-MM-DD)
  endDate: string;   // ISO
  courseMode: 'online' | 'offline' | 'onsite' | 'hybrid';
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
  // Normalize courseMode to allowed enum
  const allowedModes = new Set(['online', 'offline', 'onsite', 'hybrid']);
  const mode = allowedModes.has(course.courseMode) ? course.courseMode : 'onsite';
  // Convert human readable workload like "6 weeks · 6–8 hours/week" to ISO 8601 durations (overall + weekly)
  let courseWorkloadISO: string | undefined = undefined;
  if (course.courseWorkload) {
    const weeksMatch = course.courseWorkload.match(/(\d+)\s*week/i);
    if (weeksMatch) {
      courseWorkloadISO = `P${weeksMatch[1]}W`;
    }
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
      name: `${course.name} (${new Date(course.startDate).toLocaleString('en-ET', { month: 'long', year: 'numeric' })} Cohort)`,
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
