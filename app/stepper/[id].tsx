import { useLocalSearchParams, router } from 'expo-router';
import { View, Text, Pressable, FlatList, Alert } from 'react-native';
import { common } from '@/GameStyles/common';
import React, { useState } from 'react';
import MemoBar from '@/components/MemoBar';
import TodoRow from '@/components/TodoRow';

// Dummy Data
const DUMMY_TODOS = [
  { id: 'T01', label: 'Component Structure', checked: true },
  { id: 'T02', label: 'Props Definition', checked: true },
  { id: 'T03', label: 'State Management', checked: false },
  { id: 'T04', label: 'Styling', checked: false },
];

// 役割: Stepperの詳細画面。メモとTODOリストを持つ
export default function StepperDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [memo, setMemo] = useState('');
  const [todos, setTodos] = useState(DUMMY_TODOS);

  const handleToggle = (todoId: string) => {
    setTodos(currentTodos =>
      currentTodos.map(todo =>
        todo.id === todoId ? { ...todo, checked: !todo.checked } : todo
      )
    );
  };

  const handleEdit = (todoId: string) => {
    Alert.alert('Edit', `Editing Todo: ${todoId}`);
  };

  const handleDelete = (todoId: string) => {
    setTodos(currentTodos => currentTodos.filter(todo => todo.id !== todoId));
  };

  const handleSubmitMemo = () => {
    if (!memo) return;
    Alert.alert('Submit', `Submitting Memo: ${memo}`);
    setMemo('');
  };

  return (
    <View style={common.container}>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: '600' }}>Stepper: {id}</Text>
        <Text style={{ marginTop: 16, marginBottom: 8, fontSize: 18 }}>Memo</Text>
        <MemoBar value={memo} onChange={setMemo} onSubmit={handleSubmitMemo} />

        <Text style={{ marginTop: 24, marginBottom: 8, fontSize: 18 }}>Todos</Text>
      </View>

      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <View style={{ paddingHorizontal: 16 }}>
            <TodoRow
              {...item}
              onToggle={handleToggle}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </View>
        )}
        keyExtractor={item => item.id}
      />

      <View style={{ padding: 16 }}>
        <Pressable style={[common.filterBtn, { marginTop: 16 }]} onPress={() => router.back()}>
          <Text>戻る</Text>
        </Pressable>
      </View>
    </View>
  );
}
