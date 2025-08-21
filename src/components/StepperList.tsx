import { View, Text, Pressable, StyleSheet } from 'react-native'; // Added StyleSheet
import { common } from '@/GameStyles/common';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons'; // For delete icon

type Stepper = { id: string; title: string; progress?: number };

type Props = {
  steppers: Stepper[];
  onOpenStepper?: (id: string) => void; // 一言: 詳細画面へ遷移
  onDeleteStepper?: (id: string) => void; // New prop for deleting stepper
};

export default function StepperList({ steppers, onOpenStepper, onDeleteStepper }: Props) {
  const open = (id: string) => {
    onOpenStepper?.(id);
    router.push(`/stepper/${id}`);
  };

  return (
    <View style={[common.content, { paddingTop: 0 }]}>
      {steppers.map((s) => (
        <View key={s.id} style={styles.stepperRow}>
          <Pressable onPress={() => open(s.id)} style={common.card} accessibilityLabel={`Open Stepper ${s.title}`}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text>{s.title}</Text>
              <Text style={common.small}>{s.progress ?? 0}%</Text>
            </View>
          </Pressable>
          {onDeleteStepper && (
            <Pressable onPress={() => onDeleteStepper(s.id)} style={styles.deleteButton} accessibilityLabel={`Delete Stepper ${s.title}`}>
              <MaterialIcons name="delete" size={24} color="red" />
            </Pressable>
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  stepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8, // Space between card and delete button
  },
  deleteButton: {
    padding: 8,
  },
});
