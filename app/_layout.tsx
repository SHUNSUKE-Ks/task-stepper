import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { common } from '@/GameStyles/common';
import { FilterProvider } from '@/contexts/FilterContext';
import { StepperProvider } from '@/contexts/StepperContext'; // New import

// 役割: 全画面の共通ラッパー + スタック定義
export default function RootLayout() {
  return (
    <StepperProvider> {/* New Wrapper */}
      <FilterProvider>
        <SafeAreaView style={common.container}>
          <View style={{ flex: 1 }}>
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="stepper/[id]" options={{ title: 'Stepper' }} />
              <Stack.Screen name="settings/filter" options={{ title: 'Filter' }} />
              <Stack.Screen name="add-stepper" options={{ title: 'Add Stepper' }} /> {/* New Screen */}
            </Stack>
          </View>
        </SafeAreaView>
      </FilterProvider>
    </StepperProvider>
  );
}
