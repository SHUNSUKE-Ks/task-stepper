import { useReducer, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState, AppAction } from '@/state/appReducer';

/**
 * カスタムフック: usePersistentReducer
 * useReducerの機能に加えて、AsyncStorageを使った状態の永続化（保存と読み込み）を提供します。
 *
 * @param reducer - 状態を更新するためのレデューサー関数
 * @param initialState - 初期状態
 * @param storageKey - AsyncStorageにデータを保存・読み込みする際に使用するキー
 * @returns [state, dispatch, loading] - 現在の状態、ディスパッチ関数、読み込み中かどうかを示すブール値
 */
export const usePersistentReducer = (
  reducer: (state: AppState, action: AppAction) => AppState,
  initialState: AppState,
  storageKey: string
): [AppState, React.Dispatch<AppAction>, boolean] => {
  // useReducerを使って状態とディスパッチ関数を管理
  const [state, dispatch] = useReducer(reducer, initialState);
  // データの読み込み中かどうかを示す状態
  const [loading, setLoading] = useState(true);

  // アプリ起動時にAsyncStorageから状態を読み込むためのuseEffect
  // 依存配列が空ではない（storageKey）ため、storageKeyが変わった時にも再実行される
  useEffect(() => {
    const loadState = async () => {
      try {
        // AsyncStorageから指定されたキーでデータを取得
        const storedState = await AsyncStorage.getItem(storageKey);
        if (storedState) {
          // データが存在すれば、パースしてLOAD_STATEアクションをディスパッチし、状態を復元
          dispatch({ type: 'LOAD_STATE', payload: JSON.parse(storedState) });
        }
      } catch (error) {
        // 読み込み中にエラーが発生した場合
        console.error("Failed to load state from AsyncStorage", error);
      } finally {
        // 読み込みが完了したことを示す
        setLoading(false);
      }
    };

    loadState(); // 状態の読み込みを開始
  }, [storageKey]); // storageKeyが変更された場合にのみ再実行

  // 状態が変更されるたびにAsyncStorageに保存するためのuseEffect
  // 依存配列にstate, storageKey, loadingが含まれる
  useEffect(() => {
    // 初期読み込みが完了するまでは保存しない
    // これにより、AsyncStorageから読み込んだデータがすぐに上書きされるのを防ぐ
    if (loading) return; 

    const saveState = async () => {
      try {
        // 現在の状態をJSON文字列に変換してAsyncStorageに保存
        await AsyncStorage.setItem(storageKey, JSON.stringify(state));
      } catch (error) {
        // 保存中にエラーが発生した場合
        console.error("Failed to save state to AsyncStorage", error);
      }
    };

    saveState(); // 状態の保存を開始
  }, [state, storageKey, loading]); // state, storageKey, loadingが変更された場合にのみ再実行

  return [state, dispatch, loading];
};

