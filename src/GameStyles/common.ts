import { StyleSheet } from 'react-native';

export const common = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },        // 全体レイアウト
  content: { padding: 16, gap: 12 },                      // コンテンツ余白
  header: { height: 56, flexDirection: 'row',
            alignItems: 'center', justifyContent: 'space-between',
            paddingHorizontal: 16, borderBottomWidth: 1, borderColor: '#eee' }, // ヘッダー
  title: { fontSize: 18, fontWeight: '600' },             // タイトル文字
  filterBtn: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8,
               borderWidth: 1, borderColor: '#ddd' },     // Filterボタン
  row: { flexDirection: 'row', alignItems: 'center' },    // 横並び
  tabBar: { flexDirection: 'row', gap: 8 },               // タブ横並び
  tab: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999,
         borderWidth: 1, borderColor: '#e5e5e5' },        // タブ
  tabActive: { backgroundColor: '#111', borderColor: '#111' },
  tabActiveText: { color: '#fff' },
  card: { padding: 12, borderRadius: 12, borderWidth: 1, borderColor: '#eee' }, // ステッパーカード
  small: { fontSize: 12, color: '#666' },

  // MemoBar
  postBtn: {
    backgroundColor: '#111',
    paddingHorizontal: 16,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
  },
  postBtnText: {
    color: '#fff',
    fontWeight: '600',
  },

  // TodoRow
  todoActions: {
    flexDirection: 'row',
  },
  iconBtn: {
    padding: 4,
    marginLeft: 12,
  },
  iconPen: {
    width: 20,
    height: 20,
    color: '#20a05a', // Green
  },
  iconTrash: {
    width: 20,
    height: 20,
    color: '#cc1f1a', // Red
  },
});