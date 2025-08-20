import { View, Text } from 'react-native';
import { common } from '@/GameStyles/common';

// 役割: 後でトグルUIを入れる。今はプレースホルダーのみ
export default function FilterScreen() {
  return (
    <View style={[common.container, { padding: 16 }]}>
      <Text style={{ fontSize: 16 }}>（ここに「TODOチェック済み」フィルターを実装）</Text>
    </View>
  );
}
