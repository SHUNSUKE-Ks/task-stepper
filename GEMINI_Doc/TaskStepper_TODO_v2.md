### **開発TODOリスト (v2)**

**Phase 1: 新規コンポーネントの作成**
1.  `src/components/MemoBar.tsx` の作成
    *   役割：メモの入力欄と「投稿」ボタンを持つコンポーネント。
2.  `src/components/TodoRow.tsx` の作成
    *   役割：チェックボックス、Todoラベル、編集ボタン、削除ボタンを持つ1行のコンポーネント。

**Phase 2: ステッパー詳細画面 (`/stepper/[id]`) の強化**
1.  `app/stepper/[id].tsx` を修正。
2.  画面内にダミーのメモとTODOリストのデータを定義。
3.  作成した `MemoBar` と `TodoRow` コンポーネントを画面に配置し、ダミーデータを表示させる。

**Phase 3: 共通スタイルの追加**
1.  `src/GameStyles/common.ts` を修正。
2.  設計書で指定された新しいスタイル（編集・削除アイコンの色、投稿ボタンのスタイルなど）を追加。
