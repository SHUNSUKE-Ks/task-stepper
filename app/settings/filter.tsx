import { View, Text, Switch, StyleSheet } from 'react-native';
import { common } from '@/GameStyles/common';
import { useFilter } from '@/contexts/FilterContext';

// 役割: フィルター設定を管理する画面
export default function FilterScreen() {
  const { showOnlyUnchecked, toggleShowOnlyUnchecked } = useFilter();

  return (
    <View style={[common.container, { padding: 16 }]}>
      <View style={styles.row}>
        <Text style={styles.label}>未チェックの項目のみ表示</Text>
        <Switch
          value={showOnlyUnchecked}
          onValueChange={toggleShowOnlyUnchecked}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: {
    fontSize: 16,
  },
});
