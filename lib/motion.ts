"use client";
/**
 * Central Framer Motion wrapper for client components.
 * - Avoids `export *` so Next.js App Router / Turbopack doesn't flag wildcard re-exports in a client boundary.
 * - Re-export only the primitives actually used in the app for better tree-shaking.
 * - Add more named exports here (while still avoiding wildcard exports) as needs grow.
 */
export {
	motion,
	AnimatePresence,
	useMotionValue,
	useTransform,
	useInView,
	useAnimation,
} from 'framer-motion';

// NOTE:
// If you later need LazyMotion or domAnimation/domMax feature bundles, import and re-export them explicitly here:
// export { LazyMotion, domAnimation } from 'framer-motion';
// Keep additions explicit—never `export * from 'framer-motion'`.
