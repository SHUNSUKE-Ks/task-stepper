import React, { useState } from 'react'; // Added useState
import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native'; // Added TextInput
import Checkbox from 'expo-checkbox';
import { MaterialIcons } from '@expo/vector-icons';
import { common } from '@/GameStyles/common';

type Props = {
  id: string;
  label: string;
  checked: boolean;
  onToggle: (id: string) => void;
  onEdit: (id: string, newLabel: string) => void; // Modified onEdit signature
  onDelete: (id: string) => void;
};

// 役割：Todo1行の表示と操作
export default function TodoRow({ id, label, checked, onToggle, onEdit, onDelete }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedLabel, setEditedLabel] = useState(label);

  const handleSaveEdit = () => {
    onEdit(id, editedLabel);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedLabel(label); // Revert to original label
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      <Checkbox
        value={checked}
        onValueChange={() => onToggle(id)}
        color={checked ? '#888' : '#111'}
      />
      {isEditing ? (
        <TextInput
          style={styles.editInput}
          value={editedLabel}
          onChangeText={setEditedLabel}
          autoFocus
          onBlur={handleSaveEdit} // Save on blur
          onSubmitEditing={handleSaveEdit} // Save on Enter
        />
      ) : (
        <Text style={[styles.label, checked && styles.labelChecked]}>{label}</Text>
      )}
      <View style={common.todoActions}>
        {isEditing ? (
          <>
            <Pressable onPress={handleSaveEdit} style={common.iconBtn} accessibilityLabel="Save">
              <MaterialIcons name="save" size={20} color={common.iconPen.color} />
            </Pressable>
            <Pressable onPress={handleCancelEdit} style={common.iconBtn} accessibilityLabel="Cancel">
              <MaterialIcons name="cancel" size={20} color={common.iconTrash.color} />
            </Pressable>
          </>
        ) : (
          <Pressable onPress={() => setIsEditing(true)} style={common.iconBtn} accessibilityLabel="Edit">
            <MaterialIcons name="edit" size={20} color={common.iconPen.color} />
          </Pressable>
        )}
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
  editInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 0,
  },
});
