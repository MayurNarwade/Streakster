import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  // State to store our value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading localStorage:', error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  return [storedValue, setValue];
}

export function useResetDaily(key, initialValue) {
  const [value, setValue] = useLocalStorage(key, initialValue);
  const [lastReset, setLastReset] = useLocalStorage(`${key}_last_reset`, new Date().toDateString());

  useEffect(() => {
    const today = new Date().toDateString();
    
    if (lastReset !== today) {
      // Reset daily values
      const resetValue = value.map(item => ({
        ...item,
        completedToday: false
      }));
      setValue(resetValue);
      setLastReset(today);
    }
  }, [value, lastReset, setValue, setLastReset]);

  return [value, setValue];
}