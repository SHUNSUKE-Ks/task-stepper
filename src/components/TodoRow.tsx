import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';
import { MaterialIcons } from '@expo/vector-icons';
import { common } from '@/GameStyles/common';

type Props = {
  id: string;
  label: string;
  checked: boolean;
  onToggle: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

// 役割：Todo1行の表示と操作
export default function TodoRow({ id, label, checked, onToggle, onEdit, onDelete }: Props) {
  return (
    <View style={styles.container}>
      <Checkbox
        value={checked}
        onValueChange={() => onToggle(id)}
        color={checked ? '#888' : '#111'}
      />
      <Text style={[styles.label, checked && styles.labelChecked]}>{label}</Text>
      <View style={common.todoActions}>
        <Pressable onPress={() => onEdit(id)} style={common.iconBtn} accessibilityLabel="Edit">
          <MaterialIcons name="edit" size={20} color={common.iconPen.color} />
        </Pressable>
        <Pressable onPress={() => onDelete(id)} style={common.iconBtn} accessibilityLabel="Delete">
          <MaterialIcons name="delete" size={20} color={common.iconTrash.color} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
  },
  labelChecked: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
});
