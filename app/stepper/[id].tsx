import { useLocalSearchParams, router } from 'expo-router';
import { View, Text, Pressable, FlatList, Alert, ActivityIndicator, TextInput } from 'react-native';
import { common } from '@/GameStyles/common';
import React, { useMemo, useState } from 'react';
import MemoBar from '@/components/MemoBar';
import TodoRow from '@/components/TodoRow';
import { useFilter } from '@/contexts/FilterContext';
import { appReducer, initialState } from '@/state/appReducer';
import { usePersistentReducer } from '@/hooks/usePersistentReducer';

// 役割: Stepperの詳細画面。メモとTODOリストを持つ
export default function StepperDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const storageKey = `stepper-state-${id}`;
  const [state, dispatch, loading] = usePersistentReducer(appReducer, initialState, storageKey);
  const { showOnlyUnchecked } = useFilter();

  const [newTodoLabel, setNewTodoLabel] = useState(''); // New state for todo input

  const handleToggle = (todoId: string) => {
    dispatch({ type: 'TOGGLE_TODO', payload: todoId });
  };

  const handleEdit = (todoId: string, newLabel: string) => { // Modified handleEdit signature
    dispatch({ type: 'UPDATE_TODO_LABEL', payload: { id: todoId, label: newLabel } });
  };

  const handleDelete = (todoId: string) => {
    dispatch({ type: 'DELETE_TODO', payload: todoId });
  };

  const handleSubmitMemo = () => {
    if (!state.memo) return;
    Alert.alert('Submit', `Submitting Memo: ${state.memo}`);
    dispatch({ type: 'SET_MEMO', payload: '' });
  };

  const handleAddTodo = () => { // New function to add todo
    if (!newTodoLabel.trim()) return; // Prevent adding empty todos
    dispatch({ type: 'ADD_TODO', payload: { label: newTodoLabel.trim() } });
    setNewTodoLabel(''); // Clear input after adding
  };

  const filteredTodos = useMemo(() => {
    if (showOnlyUnchecked) {
      return state.todos.filter(todo => !todo.checked);
    }
    return state.todos;
  }, [state.todos, showOnlyUnchecked]);

  if (loading) {
    return (
      <View style={[common.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={common.container}>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: '600' }}>Stepper: {id}</Text>
        <Text style={{ marginTop: 16, marginBottom: 8, fontSize: 18 }}>Memo</Text>
        <MemoBar
          value={state.memo}
          onChange={(text) => dispatch({ type: 'SET_MEMO', payload: text })}
          onSubmit={handleSubmitMemo}
        />

        <Text style={{ marginTop: 24, marginBottom: 8, fontSize: 18 }}>Todos</Text>
        {/* New Todo Input */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
          <TextInput
            style={{ flex: 1, borderColor: '#ddd', borderWidth: 1, borderRadius: 8, paddingHorizontal: 12, height: 36, marginRight: 8 }}
            placeholder="新しいTODOを追加"
            value={newTodoLabel}
            onChangeText={setNewTodoLabel}
            onSubmitEditing={handleAddTodo} // Add todo on Enter key
          />
          <Pressable style={common.postBtn} onPress={handleAddTodo}>
            <Text style={common.postBtnText}>追加</Text>
          </Pressable>
        </View>
      </View>

      <FlatList
        data={filteredTodos}
        renderItem={({ item }) => (
          <View style={{ paddingHorizontal: 16 }}>
            <TodoRow
              {...item}
              onToggle={handleToggle}
              onEdit={handleEdit} // Now passes newLabel
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


