import { useState } from "react";

function getSavedValue(key, initialValue) {
  const savedValue = JSON.parse(localStorage.getItem(key));
  if (savedValue) return savedValue;
  return initialValue;
}

function useLocalStorage(key, initialValue) {
  const [user, setUser] = useState(() => getSavedValue(key, initialValue));

  return [user, setUser];
}

export default useLocalStorage;
