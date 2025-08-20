import React from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';
import { common } from '@/GameStyles/common';

type Props = {
  value: string;
  onChange: (text: string) => void;
  onSubmit: () => void;
};

// 役割：メモ入力と投稿ボタン
export default function MemoBar({ value, onChange, onSubmit }: Props) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder="Enter a memo..."
      />
      <Pressable style={common.postBtn} onPress={onSubmit}>
        <Text style={common.postBtnText}>投稿</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 36,
    marginRight: 8,
  },
});
