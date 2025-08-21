### **開発TODOリスト (v7)**

**Phase 1: ステッパーのグローバル状態管理**
1.  `src/contexts/StepperContext.tsx` ファイルを新規作成します。
    *   役割：アプリ全体でステッパーのリストを管理するための仕組み（React Context）です。`usePersistentReducer` を利用して、ステッパーのデータも永続化します。
2.  `app/_layout.tsx` を修正し、アプリ全体をこの `StepperContext` で囲みます。

**Phase 2: ステッパーの「追加」機能の実装**
1.  `app/index.tsx`（Home画面）を修正します。
2.  新しいステッパーを追加するためのボタン（例：ヘッダーボタンやフローティングアクションボタン）を配置します。
3.  新しいステッパーのタイトルを入力するための画面（例：`app/add-stepper.tsx`）を作成します。
4.  新しいステッパーが作成されたら、`StepperContext` に `ADD_STEPPER` アクションをディスパッチして追加します。

**Phase 3: ステッパーの「削除」機能の実装**
1.  `app/index.tsx`（Home画面）または `src/components/StepperList.tsx` を修正します。
2.  ステッパーを削除するためのUI（例：スワイプ操作や編集モードでの削除ボタン）を追加します。
3.  `StepperContext` に `DELETE_STEPPER` アクションをディスパッチして削除します。
