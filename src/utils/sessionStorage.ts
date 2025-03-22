export function setToSessionStorage(key: string, value: string) {
  sessionStorage.setItem(key, value);
}

export function getFromSessionStorage(key: string) {
  return JSON.parse(sessionStorage.getItem(key) as string);
}

export function removeFromSessionStorage(key: string) {
  sessionStorage.removeItem(key);
}

export function clearSessionStorage() {
  sessionStorage.clear();
}