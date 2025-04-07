export const destinations = [
  '/',
  '..',
  '/feed',
  '/live',
  '/scan',
  '/wallet',
  '/details',
  '/onboarding',
  '/+not-found',
  '/_sitemap',
  '/(tabs)/feed',
  '/(tabs)/live',
  '/(tabs)/scan',
  '/(tabs)/wallet',
] as const;

export type Destination = (typeof destinations)[number];
