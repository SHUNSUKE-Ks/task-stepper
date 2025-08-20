import { View, Text, Pressable } from 'react-native';
import { common } from '@/GameStyles/common';
import { router } from 'expo-router';

type Stepper = { id: string; title: string; progress?: number };

type Props = {
  steppers: Stepper[];
  onOpenStepper?: (id: string) => void; // 一言: 詳細画面へ遷移
};

export default function StepperList({ steppers, onOpenStepper }: Props) {
  const open = (id: string) => {
    onOpenStepper?.(id);
    router.push(`/stepper/${id}`);
  };
  return (
    <View style={[common.content, { paddingTop: 0 }]}>
      {steppers.map((s) => (
        <Pressable key={s.id} onPress={() => open(s.id)} style={common.card}
          accessibilityLabel={`Open Stepper ${s.title}`}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>{s.title}</Text>
            <Text style={common.small}>{s.progress ?? 0}%</Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
}
