### **開発TODOリスト (v6)**

**Phase 1: ショートカットキーの定義 (`keymap.jsonc`)**
1.  `config/keymap.jsonc` ファイルを新規作成します。
2.  このファイルに、テキスト入力に関連するショートカットキーの定義を記述します。
    ```jsonc
    {
      "textInputShortcuts": {
        "submit": "Enter",     // テキスト入力の確定（例：メモの投稿、新しいTODOの追加）
        "cancelEdit": "Escape" // 編集モードのキャンセル（例：TODOラベルの編集）
      }
    }
    ```

**Phase 2: ショートカットキーの機能実装**
1.  **Enterキーでの保存:**
    *   `MemoBar.tsx` と `TodoRow.tsx` の `TextInput` には、すでに `onSubmitEditing` プロパティが設定されており、Enterキーが押された際に保存（または送信）処理が実行されるようになっています。この部分は既存のコードで対応済みです。
2.  **Escapeキーでの脱出（キャンセル）:**
    *   `TodoRow.tsx` の編集モードでは、現在 `TextInput` からフォーカスが外れた際（`onBlur`）に保存処理が実行されます。Escapeキーでのキャンセルについては、React Nativeの `TextInput` が直接Escapeキーのイベントをサポートしていないため、実装が少し複雑になります。
    *   **ご提案:** 現状では、編集中の `TextInput` からフォーカスを外すことでキャンセル（保存せずに脱出）とみなすことができます。もし、明示的にEscapeキーを押したときにキャンセル動作をさせたい場合は、プラットフォーム（Web/モバイル）ごとの対応が必要になる可能性があります。
