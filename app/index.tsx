import { View } from 'react-native';
import Header from '@/components/Header';
import PhaseTabs from '@/components/PhaseTabs';
import StepperList from '@/components/StepperList';
import { common } from '@/GameStyles/common';
import { router } from 'expo-router';
import React from 'react';

// ダミーデータ（画面遷移確認用）
const PHASES = [
  { id: 'plan', title: '設計' },
  { id: 'build', title: '実装' },
  { id: 'test', title: 'テスト' },
  { id: 'release', title: 'リリース' },
];
const STEPPERS = [
  { id: 'S01', title: '仕様確定', progress: 40 },
  { id: 'S02', title: 'UIスケッチ', progress: 10 },
  { id: 'S03', title: '技術選定', progress: 80 },
];

// 役割: Header + PhaseTabs + StepperListの骨組み
export default function HomeScreen() {
  const [activeId, setActiveId] = React.useState(PHASES[0].id);
  return (
    <View style={common.container}>
      <Header title="TaskStepper" onPressFilter={() => router.push('/settings/filter')} />
      <PhaseTabs phases={PHASES} activeId={activeId} onChange={setActiveId} />
      <StepperList steppers={STEPPERS} />
    </View>
  );
}
