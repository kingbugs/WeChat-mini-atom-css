import { getStorage, setStorage, removeStorage } from '../utils/index';

export function useStorage<T>(key: string, defaultValue?: T): {
  value: T;
  get: () => T;
  set: (value: T) => void;
  remove: () => void;
} {
  let value = getStorage<T>(key, defaultValue);

  const get = () => {
    value = getStorage<T>(key, defaultValue);
    return value;
  };

  const set = (newValue: T) => {
    value = newValue;
    setStorage(key, newValue);
  };

  const remove = () => {
    value = defaultValue as T;
    removeStorage(key);
  };

  return { value, get, set, remove };
}

export function useSessionStorage<T>(key: string, defaultValue?: T): {
  value: T;
  get: () => T;
  set: (value: T) => void;
  remove: () => void;
} {
  return useStorage<T>(key, defaultValue);
}