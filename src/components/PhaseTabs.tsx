import { View, Text, Pressable } from 'react-native';
import { common } from '@/GameStyles/common';

type Phase = { id: string; title: string };

type Props = {
  phases: Phase[];
  activeId: string;
  onChange?: (id: string) => void;
};
// 役割: 横タブでPhase切替（ダミーのUI）
export default function PhaseTabs({ phases, activeId, onChange }: Props) {
  return (
    <View style={[common.content, common.tabBar]}>
      {phases.map((p) => {
        const active = p.id === activeId;
        return (
          <Pressable key={p.id} onPress={() => onChange?.(p.id)}
            style={[common.tab, active && common.tabActive]}
            accessibilityLabel={`Phase ${p.title}`}
          >
            <Text style={active ? common.tabActiveText : undefined}>{p.title}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
