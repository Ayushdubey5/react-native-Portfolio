import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    async function prepare() {
      try {
        // Simulated minimal load time for assets/fonts
        await new Promise(resolve => setTimeout(resolve, 300));
      } catch (e) {
        console.warn('[v0] Setup error:', e);
      } finally {
        // Tell the native splash screen to fade away
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#0a0e27' },
            animation: 'default', // <-- FIXED: Changed from animationEnabled
          }}
        >
          <Stack.Screen 
            name="(tabs)" 
            options={{ animation: 'none' }} // <-- FIXED: Changed from animationEnabled
          />
        </Stack>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}