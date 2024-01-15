import {useCallback, useMemo} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useKyonAsyncStorageListener = () => {
  const getItem = async (key: string) => {
    try {
      const item = await AsyncStorage.getItem(key);
      return item !== null ? item : null;
    } catch (e: any) {
      throw  new Error(e);
    }
  };

  const setItem = useCallback(async (key: string, value: string) => {
    try {
      const exist = await getItem(key);

      if (exist) {
        await AsyncStorage.mergeItem(key, value);
      } else {
        await AsyncStorage.setItem(key, value);
      }
      return exist ? 'merge' : 'saved';
    } catch (e: any) {
      throw  new Error(e);
    }
  }, []);

  const clear = async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
      return 'deleted';
    } catch (e: any) {
      throw  new Error(e);
    }
  };

  return useMemo(
    () => ({
      getItem: (key: string) => getItem(key),
      setItem: (key: string, value: any) => setItem(key, value),
      clear: (key: string) => clear(key),
    }),
    [setItem],
  );
};
