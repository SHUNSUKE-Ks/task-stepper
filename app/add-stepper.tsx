import { View, Text, TextInput, Pressable, Alert, Keyboard } from 'react-native';
import { common } from '@/GameStyles/common';
import React, { useState } from 'react';
import { router } from 'expo-router';
import { useStepper } from '@/contexts/StepperContext';

export default function AddStepperScreen() {
  const [stepperTitle, setStepperTitle] = useState('');
  const { stepperDispatch } = useStepper();

  const handleAddStepper = () => {
    if (!stepperTitle.trim()) {
      Alert.alert('エラー', 'ステッパーのタイトルを入力してください。');
      return;
    }
    stepperDispatch({ type: 'ADD_STEPPER', payload: { title: stepperTitle.trim() } });
    setStepperTitle('');
    Keyboard.dismiss(); // Dismiss keyboard
    router.back(); // Go back to the home screen
  };

  return (
    <View style={[common.container, { padding: 16 }]}>
      <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 20 }}>新しいステッパーを追加</Text>
      <TextInput
        style={{ borderColor: '#ddd', borderWidth: 1, borderRadius: 8, paddingHorizontal: 12, height: 40, marginBottom: 20 }}
        placeholder="ステッパーのタイトル"
        value={stepperTitle}
        onChangeText={setStepperTitle}
        onSubmitEditing={handleAddStepper}
      />
      <Pressable style={common.postBtn} onPress={handleAddStepper}>
        <Text style={common.postBtnText}>追加</Text>
      </Pressable>
      <Pressable style={[common.filterBtn, { marginTop: 16 }]} onPress={() => router.back()}>
        <Text>キャンセル</Text>
      </Pressable>
    </View>
  );
}
