✅ TaskStepper 開発 TODO（初期テスト編） Phase 1：環境調整

react-native-safe-area-context@5.4.0 に切り替える

react-native-screens@~4.11.1 に切り替える

npm install を実行して依存関係を整理

npx expo start -c でキャッシュをクリア

Phase 2：起動確認（Web）

PowerShell で npx expo start を実行

Expo Metro Bundler が立ち上がることを確認

キーボード w を押してブラウザで起動

Home 画面に「TaskStepper」＋ダミー UI（PhaseTabs, StepperList）が表示されることを確認

Phase 3：起動確認（スマホ）

スマホに Expo Go をインストール（Android/iOS）

PC とスマホを同じ Wi-Fi に接続

Expo CLI に表示された QR コードを読み取る

スマホで Home 画面が表示されることを確認

Phase 4：同時テスト

コードを保存（Ctrl+S） → Web/スマホ両方に Fast Refresh で反映されるか確認

Stepper をタップ → 詳細画面に遷移するか確認

Header 右上の「Filter」 → フィルター画面に遷移するか確認
