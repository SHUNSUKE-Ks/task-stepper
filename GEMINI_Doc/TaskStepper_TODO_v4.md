### **開発TODOリスト (v4)**

**Phase 1: `useReducer` による状態管理の改善**
1.  `src/state/appReducer.ts` ファイルを新規作成し、以下のロジックを定義します。
    *   **State（管理するデータ）:**
        *   `memo: string`
            *   メモ入力欄のテキスト。
        *   `todos: Todo[]`
            *   TODO項目の配列。各項目は `{ id: string, label: string, checked: boolean }` の形式。
    *   **Actions（実行する操作の種類）:**
        *   `SET_MEMO`: メモのテキストを更新する。
        *   `ADD_TODO`: 新しいTODO項目を追加する。
        *   `TOGGLE_TODO`: 指定したTODOのチェック状態をON/OFFする。
        *   `DELETE_TODO`: 指定したTODOを削除する。
        *   `UPDATE_TODO_LABEL`: 指定したTODOのテキストを更新する（編集機能用）。
        *   `LOAD_STATE`: ストレージから読み込んだデータで、State全体を復元する。
    *   **Dispatch（操作を実行する命令の例）:**
        *   `dispatch({ type: 'TOGGLE_TODO', payload: 'todo-id-123' })`
        *   `dispatch({ type: 'SET_MEMO', payload: '新しいメモのテキスト' })`
2.  `app/stepper/[id].tsx` を修正し、`useState` の代わりにこの `useReducer` を使って、上記の操作を実行できるようにします。

**Phase 2: `AsyncStorage` からのデータ読み込み**
1.  `src/hooks/usePersistentReducer.ts` というカスタムフックを作成します。
2.  アプリ起動時に `AsyncStorage` からデータを読み込み、`LOAD_STATE` アクションを `dispatch` して状態を復元します。

**Phase 3: `AsyncStorage` へのデータ保存**
1.  `usePersistentReducer.ts` を強化します。
2.  Stateに変更があるたびに、自動的に `AsyncStorage` に新しい状態を保存します。
