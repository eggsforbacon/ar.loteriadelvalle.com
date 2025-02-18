import { Stack, Link } from 'expo-router';
import React from 'react';
import { Platform, Text, View } from 'react-native';

import { Button } from '~/components/Button';
import { Container } from '~/components/Container';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home', headerShown: false }} />
      <Container>
        <View className={styles.container}>
          <Text
            style={{
              fontFamily: Platform.select({
                android: 'Poppins_600SemiBold',
                ios: 'Poppins-SemiBold',
              }),
            }}
            className={styles.title}>
            Lotería del Valle
          </Text>
          <Text
            style={{
              fontFamily: Platform.select({
                android: 'Poppins_400Regular',
                ios: 'Poppins-Regular',
              }),
            }}
            className={styles.copy}>
            Bienvenido a la aplicación de la lotería del Valle
          </Text>
        </View>
        <Link href={{ pathname: '/onboarding' }} asChild>
          <Button title="Comenzar" />
        </Link>
      </Container>
    </>
  );
}

const styles = {
  container: `items-center flex-1 justify-start flex-col gap-4 pt-32`,
  separator: `h-[1px] my-7 w-4/5 bg-gray-200`,
  title: `text-6xl text-center leading-[1.2]`,
  copy: `text-center text-lg`,
};
