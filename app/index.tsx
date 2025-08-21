import { View, ActivityIndicator, StyleSheet } from 'react-native';
import Header from '@/components/Header';
import PhaseTabs from '@/components/PhaseTabs';
import StepperList from '@/components/StepperList';
import { common } from '@/GameStyles/common';
import { router } from 'expo-router';
import React from 'react';
import { useStepper } from '@/contexts/StepperContext';
import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, Text } from 'react-native';

// ダミーデータ（画面遷移確認用）
const PHASES = [
  { id: 'plan', title: '設計' },
  { id: 'build', title: '実装' },
  { id: 'test', title: 'テスト' },
  { id: 'release', title: 'リリース' },
];

// 役割: Header + PhaseTabs + StepperListの骨組み
export default function HomeScreen() {
  const [activeId, setActiveId] = React.useState(PHASES[0].id);
  const { stepperState, stepperLoading, stepperDispatch } = useStepper(); // Added stepperDispatch

  const handleDeleteStepper = (id: string) => {
    stepperDispatch({ type: 'DELETE_STEPPER', payload: id });
  };

  if (stepperLoading) {
    return (
      <View style={[common.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={common.container}>
      <Header
        title="TaskStepper"
        onPressFilter={() => router.push('/settings/filter')}
      />
      <PhaseTabs phases={PHASES} activeId={activeId} onChange={setActiveId} />
      <StepperList
        steppers={stepperState.steppers}
        onDeleteStepper={handleDeleteStepper} // Pass delete handler
      />
      {/* Add Stepper Button */}
      <Pressable
        style={styles.addStepperButton}
        onPress={() => router.push('/add-stepper')}
        accessibilityLabel="Add new stepper"
      >
        <MaterialIcons name="add" size={24} color="white" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  addStepperButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#111',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});
