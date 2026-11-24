import React from 'react';
import { useColorScheme } from 'react-native';
import { Stack } from 'expo-router';
import { SepetProvider } from '../context/SepetContext';
import { Colors } from '../constants/Colors';

export default function RootLayout() {
  const theme = Colors[useColorScheme()] ?? Colors.light;
  return (
    <SepetProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.background },
          headerTintColor: theme.text,
          headerTitleStyle: { fontWeight: '800' },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: theme.background },
        }}
      >
        <Stack.Screen
          name="index"
          options={{ title: 'MORA Atelier', headerShown: false }}
        />
        <Stack.Screen
          name="urun/[id]"
          options={{ title: 'Ürün Detayı' }}
        />
        <Stack.Screen
          name="sepet"
          options={{ title: 'Sepetim' }}
        />
      </Stack>
    </SepetProvider>
  );
}
