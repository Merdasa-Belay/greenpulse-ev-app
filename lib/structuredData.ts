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

// --- Generic Post-Build Sanitizers ---

type JsonObject = { [k: string]: unknown };

/**
 * Sanitize a CourseInstance node in-place: enforce valid courseMode enum and migrate extra info to name.
 */
export function sanitizeCourseInstance(instance: JsonObject) {
  if (!instance || instance['@type'] !== 'CourseInstance') return instance;
  const allowed = ['online', 'offline', 'onsite', 'hybrid'];
  if (typeof instance.courseMode === 'string') {
    const raw = instance.courseMode.trim();
    const lower = raw.toLowerCase();
    let mode: string = 'hybrid';
    let remainder = '';
    // Extract parentheses content if present
  // Determine mode from start
    for (const m of allowed) {
      if (lower.startsWith(m)) {
        mode = m;
        remainder = raw.slice(m.length).trim();
        break;
      }
    }
    // If no leading allowed token found but parentheses pattern exists, keep default mode
    let cohortInfo: string | undefined;
    // Parentheses content
    const directParen = raw.match(/\(([^)]+)\)/);
    if (directParen) {
      cohortInfo = directParen[1].trim();
    }
    // If remainder has non-parenthetical text, treat as extra info
    const remainderNoParens = remainder.replace(/\([^)]*\)/g, '').trim();
    if (!cohortInfo && remainderNoParens) {
      cohortInfo = remainderNoParens;
    }
    instance.courseMode = mode;
    if (cohortInfo) {
      // Append cohort info to name if not already present
      if (typeof instance.name === 'string' && !instance.name.includes(cohortInfo)) {
        instance.name = `${instance.name} (${cohortInfo})`;
      }
    }
  }
  return instance;
}

/**
 * Traverse a JSON-LD graph (array) or single node and sanitize any CourseInstance nodes found
 * whether standalone or inside hasCourseInstance.
 */
export function sanitizeCourseGraph<T>(root: T): T {
  const visit = (node: unknown) => {
    if (!node || typeof node !== 'object') return;
    if (Array.isArray(node)) {
      node.forEach(visit);
      return;
    }
    const obj = node as JsonObject;
    if (obj['@type'] === 'CourseInstance') {
      sanitizeCourseInstance(obj);
    }
    // hasCourseInstance can be object or array
    if (obj.hasCourseInstance) {
      if (Array.isArray(obj.hasCourseInstance)) {
        obj.hasCourseInstance.forEach(ci => sanitizeCourseInstance(ci as JsonObject));
      } else if (typeof obj.hasCourseInstance === 'object') {
        sanitizeCourseInstance(obj.hasCourseInstance as JsonObject);
      }
    }
    // Recurse other properties shallowly
    for (const key of Object.keys(obj)) {
      const val = (obj as JsonObject)[key];
      if (val && typeof val === 'object') visit(val);
    }
  };
  visit(root);
  return root;
}
