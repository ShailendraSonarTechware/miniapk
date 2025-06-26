// app/_layout.tsx
import { useEffect, useState } from 'react';
import { Stack, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '../hooks/useFrameworkReady'
import { useFrameworkReady } from '@/hooks/useFrameworkReady';

export default function RootLayout() {
  useFrameworkReady();

  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    const checkOnboarding = async () => {
      const completed = await AsyncStorage.getItem('onboardingCompleted');
      setInitialRoute(completed ? '(tabs)' : 'onboarding/Onboarding1');
    };
    checkOnboarding();
  }, []);

  if (!initialRoute) return null; // Prevent flicker

  return (
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }} initialRouteName={initialRoute}>
        <Stack.Screen name="onboarding/Onboarding1" />
        <Stack.Screen name="onboarding/Onboarding4" />
        <Stack.Screen name="auth/Login" />
        <Stack.Screen name="auth/Signup" />
        <Stack.Screen name="auth/SignupVendor" />
        <Stack.Screen name="auth/ForgotPassword" />
        <Stack.Screen name="products/index" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  );
}