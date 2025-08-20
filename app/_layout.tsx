import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { common } from '@/GameStyles/common';
import { FilterProvider } from '@/contexts/FilterContext';

// 役割: 全画面の共通ラッパー + スタック定義
export default function RootLayout() {
  return (
    <FilterProvider>
      <SafeAreaView style={common.container}>
        <View style={{ flex: 1 }}>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="stepper/[id]" options={{ title: 'Stepper' }} />
            <Stack.Screen name="settings/filter" options={{ title: 'Filter' }} />
          </Stack>
        </View>
      </SafeAreaView>
    </FilterProvider>
  );
}
