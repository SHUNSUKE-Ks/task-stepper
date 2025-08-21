# TaskStepper – React Native + Expo Router（TS）レイアウト＆画面遷移（v1）

**狙い**：TODO管理アプリの基本機能と永続化、拡張性を備えたバージョン。

---

## 📁 プロジェクト構成（v1）

```
project-root/
├─ app/
│  ├─ _layout.tsx                # ルートレイアウト（タブ/スタックの土台）
│  ├─ index.tsx                  # Home：Phase × Stepper 一覧
│  ├─ stepper/
│  │  └─ [id].tsx                # ステッパー詳細（メモ、TODOリスト）
│  ├─ settings/
│  │  └─ filter.tsx              # フィルター画面
│  └─ add-stepper.tsx            # 新規ステッパー追加画面
├─ src/
│  ├─ components/
│  │  ├─ Header.tsx              # ヘッダー（右にFilterボタン）
│  │  ├─ PhaseTabs.tsx           # 横タブ（ダミー）
│  │  ├─ StepperList.tsx         # 縦リスト（ステッパー一覧）
│  │  ├─ MemoBar.tsx             # メモ入力と投稿ボタン
│  │  └─ TodoRow.tsx             # Todo1行（チェック、編集、削除）
│  ├─ GameStyles/
│  │  └─ common.ts               # 共通StyleSheet
│  ├─ contexts/
│  │  ├─ FilterContext.tsx       # フィルター状態管理Context
│  │  └─ StepperContext.tsx      # ステッパーリスト状態管理Context
│  ├─ hooks/
│  │  └─ usePersistentReducer.ts # 永続化Reducerカスタムフック
│  └─ state/
│     └─ appReducer.ts           # アプリケーション全体のReducer
├─ config/
│  └─ keymap.jsonc               # キーボードショートカット設定
├─ tsconfig.json
├─ package.json
└─ ...その他ファイル
```

---

## 🔧 インストール済みパッケージ

```bash
# 初期インストール
npm i expo-router react-native-safe-area-context react-native-screens
npx expo install @react-native-async-storage/async-storage

# 追加インストール
npx expo install expo-checkbox
npx expo install @expo/vector-icons
```

`app.json` に `plugins: ["expo-router"]` を追加。
`tsconfig.json` は `extends: "expo/tsconfig.base"` を使用。

---

## ✅ 実装済み機能概要

### 1. 基本レイアウトと画面遷移
*   `app/_layout.tsx`: 全画面共通のラッパーとスタックナビゲーション定義。`FilterProvider` と `StepperProvider` でアプリ全体を囲む。
*   `app/index.tsx`: ホーム画面。Header、PhaseTabs、StepperListの骨組み。右下にステッパー追加ボタン。
*   `app/stepper/[id].tsx`: ステッパー詳細画面。メモ入力、TODOリスト表示。
*   `app/settings/filter.tsx`: フィルター設定画面。
*   `app/add-stepper.tsx`: 新規ステッパー追加画面。

### 2. TODO管理機能
*   **TODOの追加:** 詳細画面で新しいTODOを入力し、リストに追加。
*   **TODOのチェック/解除:** 各TODOのチェックボックスで状態を切り替え。
*   **TODOの編集:** 各TODOの横にある編集アイコンでラベルをインライン編集。Enterで保存、フォーカスアウトでキャンセル。
*   **TODOの削除:** 各TODOの横にある削除アイコンで項目を削除。

### 3. フィルター機能
*   `src/contexts/FilterContext.tsx`: 「未チェックの項目のみ表示」フィルターの状態をグローバルに管理。
*   `app/settings/filter.tsx`: フィルターのON/OFFを切り替えるスイッチUI。
*   `app/stepper/[id].tsx`: フィルターの状態に応じてTODOリストの表示を動的に切り替え。

### 4. データの永続化
*   `src/state/appReducer.ts`: アプリケーションの状態（メモ、TODOリスト）を管理するReducer。
*   `src/hooks/usePersistentReducer.ts`: `useReducer` を拡張し、`AsyncStorage` を使って状態を自動的に保存・読み込みするカスタムフック。
*   `app/stepper/[id].tsx`: `usePersistentReducer` を使用し、ステッパーごとのメモとTODOリストの状態を永続化。
*   `src/contexts/StepperContext.tsx`: ステッパーリスト自体も `usePersistentReducer` を使って永続化。

### 5. ステッパー管理機能
*   **ステッパーの追加:** ホーム画面の「＋」ボタンから新しいステッパーを追加。タイトルを入力して保存するとリストに追加され、永続化される。
*   **ステッパーの削除:** ホーム画面の各ステッパーの横にあるゴミ箱アイコンでステッパーを削除。

### 6. スタイルと共通コンポーネント
*   `src/GameStyles/common.ts`: 共通のスタイル定義。新しいボタンやアイコンの色、サイズなどを追加。
*   `src/components/Header.tsx`: 共通ヘッダー。
*   `src/components/PhaseTabs.tsx`: フェーズ切り替えタブ。
*   `src/components/StepperList.tsx`: ステッパー一覧表示。
*   `src/components/MemoBar.tsx`: メモ入力バー。
*   `src/components/TodoRow.tsx`: TODO項目表示。

### 7. キーボードショートカット設定
*   `config/keymap.jsonc`: キーボードショートカットの定義ファイル。Enterキーでの保存動作が定義済み。

---

## 🚀 次のステップ（提案）

*   **PhaseTabsの機能強化:** 現在ダミーのPhaseTabsを、実際のPhaseデータと連動させる。
*   **Phaseの管理機能:** Phaseの追加・編集・削除機能。
*   **ステッパーの並び替え:** ドラッグ＆ドロップなどによるステッパーの並び替え機能。
*   **検索機能:** TODOやステッパーの検索機能。
*   **UI/UXの改善:** より洗練されたデザインやアニメーションの追加。
