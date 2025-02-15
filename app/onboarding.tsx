import { Stack } from 'expo-router';
import { Text } from 'react-native';

import { Container } from '~/components/Container';

export default function Onboarding() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Container>
        <Text>This is an onboarding screen</Text>
      </Container>
    </>
  );
}
