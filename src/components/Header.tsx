import { View, Text, Pressable } from 'react-native';
import { common } from '@/GameStyles/common';

type Props = { title?: string; onPressFilter?: () => void };
// 役割: 画面上部のタイトルとFilter導線（右）
export default function Header({ title = 'TaskStepper', onPressFilter }: Props) {
  return (
    <View style={common.header}>
      <Text style={common.title}>{title}</Text>
      <Pressable
        accessibilityLabel="Open Filter"
        style={common.filterBtn}
        onPress={onPressFilter}
      >
        <Text>Filter</Text>
      </Pressable>
    </View>
  );
}
