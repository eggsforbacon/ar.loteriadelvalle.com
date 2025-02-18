import { Stack } from 'expo-router';

import { Onboarding as OnboardingContent } from '../components/Onboarding';

export default function Onboarding() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <OnboardingContent />
    </>
  );
}
