import { useState, useEffect } from "react";

export function useLocalStorageData<T>(key: string, initialValue: T) {
  const [data, setData] = useState<T>(() => {
    // Initialize with localStorage data if available, otherwise use the initialValue
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : initialValue;
  });

  useEffect(() => {
    // Sync the data state with localStorage whenever the key or initialValue changes
    const storedData = localStorage.getItem(key);
    if (!storedData) {
      localStorage.setItem(key, JSON.stringify(initialValue));
    }
  }, [key, initialValue]);

  // Sync the localStorage whenever the `data` changes
  useEffect(() => {
    if (data !== undefined) {
      localStorage.setItem(key, JSON.stringify(data));
    }
  }, [key, data]);

  return [data, setData] as const;
}
