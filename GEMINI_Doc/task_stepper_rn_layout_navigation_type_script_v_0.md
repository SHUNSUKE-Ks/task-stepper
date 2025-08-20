# TaskStepper – React Native + Expo Router（TS）レイアウト＆画面遷移（最小）

**狙い**：まずは**画面構成と遷移だけ**を実装。ロジックやデータはダミー。

---

## 📁 プロジェクト構成（最小）
```
project-root/
├─ app/
│  ├─ _layout.tsx                # ルートレイアウト（タブ/スタックの土台）
│  ├─ index.tsx                  # Home：Phase × Stepper 一覧
│  ├─ stepper/
│  │  └─ [id].tsx                # ステッパー詳細（遷移のみ）
│  └─ settings/
│     └─ filter.tsx              # フィルター画面（遷移のみ）
├─ src/
│  ├─ components/
│  │  ├─ Header.tsx              # ヘッダー（右にFilterボタン）
│  │  ├─ PhaseTabs.tsx           # 横タブ（ダミー）
│  │  └─ StepperList.tsx         # 縦リスト（ダミー）
│  └─ GameStyles/
│     └─ common.ts               # 共通StyleSheet
├─ tsconfig.json
└─ package.json
```

---

## 🔧 インストール想定
```bash
npx create-expo-app@latest task-stepper --template blank
cd task-stepper
npm i expo-router react-native-safe-area-context react-native-screens
npx expo install @react-native-async-storage/async-storage
```

`app.json` に `plugins: ["expo-router"]` を追加。

---

$1
- `<MemoBar value onChange onSubmit />`：**メモ入力と送信（投稿）**
- `<TodoRow id label checked onToggle onEdit onDelete />`：**Todo1行（右端：編集/削除アンカー）**

$2
## `src/GameStyles/common.ts`
```ts
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
});
```

---

## `src/components/Header.tsx`
```tsx
import { View, Text, Pressable } from 'react-native';
import { common } from '@/GameStyles/common';

type Props = { title?: string; onPressFilter?: () => void };
// 役割: 画面上部のタイトルとFilter導線（右）
export default function Header({ title = 'TaskStepper', onPressFilter }: Props) {
  return (
    <View style={common.header}>
      <Text style={common.title}>{title}</Text>
      <Pressable
        accessibilityLabel="Open Filter"
        style={common.filterBtn}
        onPress={onPressFilter}
      >
        <Text>Filter</Text>
      </Pressable>
    </View>
  );
}
```

---

## `src/components/PhaseTabs.tsx`
```tsx
import { View, Text, Pressable } from 'react-native';
import { common } from '@/GameStyles/common';

type Phase = { id: string; title: string };

type Props = {
  phases: Phase[];
  activeId: string;
  onChange?: (id: string) => void;
};
// 役割: 横タブでPhase切替（ダミーのUI）
export default function PhaseTabs({ phases, activeId, onChange }: Props) {
  return (
    <View style={[common.content, common.tabBar]}>
      {phases.map((p) => {
        const active = p.id === activeId;
        return (
          <Pressable key={p.id} onPress={() => onChange?.(p.id)}
            style={[common.tab, active && common.tabActive]}
            accessibilityLabel={`Phase ${p.title}`}
          >
            <Text style={active ? common.tabActiveText : undefined}>{p.title}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
```

---

## `src/components/StepperList.tsx`
```tsx
import { View, Text, Pressable } from 'react-native';
import { common } from '@/GameStyles/common';
import { router } from 'expo-router';

type Stepper = { id: string; title: string; progress?: number };

type Props = {
  steppers: Stepper[];
  onOpenStepper?: (id: string) => void; // 一言: 詳細画面へ遷移
};

export default function StepperList({ steppers, onOpenStepper }: Props) {
  const open = (id: string) => {
    onOpenStepper?.(id);
    router.push(`/stepper/${id}`);
  };
  return (
    <View style={[common.content, { paddingTop: 0 }]}>
      {steppers.map((s) => (
        <Pressable key={s.id} onPress={() => open(s.id)} style={common.card}
          accessibilityLabel={`Open Stepper ${s.title}`}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>{s.title}</Text>
            <Text style={common.small}>{s.progress ?? 0}%</Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
}
```

---

## `app/_layout.tsx`
```tsx
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { common } from '@/GameStyles/common';

// 役割: 全画面の共通ラッパー + スタック定義
export default function RootLayout() {
  return (
    <SafeAreaView style={common.container}>
      <View style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="stepper/[id]" options={{ title: 'Stepper' }} />
          <Stack.Screen name="settings/filter" options={{ title: 'Filter' }} />
        </Stack>
      </View>
    </SafeAreaView>
  );
}
```

---

## `app/index.tsx`（Home：レイアウトと遷移のみ）
```tsx
import { View } from 'react-native';
import Header from '@/components/Header';
import PhaseTabs from '@/components/PhaseTabs';
import StepperList from '@/components/StepperList';
import { common } from '@/GameStyles/common';
import { router } from 'expo-router';

// ダミーデータ（画面遷移確認用）
const PHASES = [
  { id: 'plan', title: '設計' },
  { id: 'build', title: '実装' },
  { id: 'test', title: 'テスト' },
  { id: 'release', title: 'リリース' },
];
const STEPPERS = [
  { id: 'S01', title: '仕様確定', progress: 40 },
  { id: 'S02', title: 'UIスケッチ', progress: 10 },
  { id: 'S03', title: '技術選定', progress: 80 },
];

// 役割: Header + PhaseTabs + StepperListの骨組み
export default function HomeScreen() {
  const [activeId, setActiveId] = React.useState(PHASES[0].id);
  return (
    <View style={common.container}>
      <Header title="TaskStepper" onPressFilter={() => router.push('/settings/filter')} />
      <PhaseTabs phases={PHASES} activeId={activeId} onChange={setActiveId} />
      <StepperList steppers={STEPPERS} />
    </View>
  );
}
```

> **Props一言**
> - `Header{ title, onPressFilter }`：タイトル表示／フィルターへ遷移
> - `PhaseTabs{ phases, activeId, onChange }`：Phase切替
> - `StepperList{ steppers, onOpenStepper }`：ステッパー押下で詳細へ

---

## `app/stepper/[id].tsx`（詳細：遷移確認用画面）
```tsx
import { useLocalSearchParams, router } from 'expo-router';
import { View, Text, Pressable } from 'react-native';
import { common } from '@/GameStyles/common';

// 役割: 受け取ったidを表示するだけ（後で中身実装）
export default function StepperDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <View style={[common.container, { padding: 16 }]}>
      <Text style={{ fontSize: 20, fontWeight: '600' }}>Stepper: {id}</Text>
      <Pressable style={[common.filterBtn, { marginTop: 16 }]} onPress={() => router.back()}>
        <Text>戻る</Text>
      </Pressable>
    </View>
  );
}
```

---

## `app/settings/filter.tsx`（フィルター：遷移確認用画面）
```tsx
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
```

---

## `tsconfig.json`（最小）
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "jsx": "react-jsx",
    "strict": true,
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] }
  }
}
```

---

### ✅ ここまででできること
- **Header → Filter** への遷移
- **StepperList → 詳細** への遷移（`/stepper/[id]`）
- **PhaseTabs** のアクティブ切替（見た目のみ）

### 次ステップ（任意）
- `FlatList` への置換／ダミーデータを Phase ごとに分離
- `useReducer + AsyncStorage` 導入
- Filter（チェック済みのみ表示）トグルの配置


---

## 🆕 v0.1.1 追記：Stepper Detail 強化（ワイヤーフレーム対応）

### 仕様追加
- **Memo** 行に **投稿ボタン**（`Label: 投稿`）を配置。
- **Todoリスト** 各行の**右端アンカー**：
  - **編集**：斜めのペンアイコン（**緑**）→ `onEdit(id)` を起動し、ラベルのインライン編集モードへ。
  - **削除**：ゴミ箱アイコン（**赤**）→ `onDelete(id)` で行削除（確認ダイアログ推奨）。

### 新規/更新コンポーネント（Props：一言説明）
- `<MemoBar value onChange onSubmit />`：**メモ入力＋投稿**
  - `value:string`（表示値）／`onChange(text)`（編集）／`onSubmit()`（投稿実行）
- `<TodoRow id label checked onToggle onEdit onDelete />`：**Todo1行の操作**
  - `onToggle(id)`：チェック切替／`onEdit(id)`：編集／`onDelete(id)`：削除

### UIノート（スタイル一言）
- **投稿ボタン**：高さ36dp・角丸8dp・タップ領域44dp以上。
- **右端アンカー**：`pen = #20a05a`（緑）／`trash = #cc1f1a`（赤）。
- **アクセシビリティ**：`accessibilityLabel` を「編集」「削除」「投稿」に付与。

### 画面ワイヤーフレーム（SVG）
- `taskstepper_wire_stepper-detail_v2_390x844.svg`（390x844.svg）
  - 追加要素：Memo右「投稿」ボタン、Todo右端ペン/ゴミ箱。

> 関数の役割（要約）：`onSubmit`＝**メモを送信**、`onEdit`＝**Todoを編集**、`onDelete`＝**Todoを削除**。
> CSS相当（StyleSheet）要点：**ボタン角丸・枠線色・タップ領域**の3点を共通化。

