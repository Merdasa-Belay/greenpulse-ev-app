// Centralized feature flags. Values are read from env at build time.
// Use only NEXT_PUBLIC_* for client-exposed flags.

export const APP_ENV = process.env.NEXT_PUBLIC_APP_ENV || 'development';

const enabled = (v: string | undefined) => v === 'enabled' || v === 'true' || v === '1';

export const features = {
  tutorials: enabled(process.env.NEXT_PUBLIC_FEATURE_TUTORIALS),
  subscriptions: enabled(process.env.NEXT_PUBLIC_FEATURE_SUBSCRIPTIONS),
  experimentalUI: enabled(process.env.NEXT_PUBLIC_FEATURE_EXPERIMENTAL_UI),
  newDashboard: enabled(process.env.NEXT_PUBLIC_FEATURE_NEW_DASHBOARD),
  landingV2: enabled(process.env.NEXT_PUBLIC_FEATURE_LANDING_V2),
} as const;

export type FeatureFlag = keyof typeof features;

export function isFeatureEnabled(flag: FeatureFlag) {
  return !!features[flag];
}
