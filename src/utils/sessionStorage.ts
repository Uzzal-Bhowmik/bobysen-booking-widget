"use client"

export function setToSessionStorage(key: string, value: string) {
  if (typeof window !== 'undefined') {

    return sessionStorage.setItem(key, value);
  }
}

export function getFromSessionStorage(key: string) {
  if (typeof window !== 'undefined') {
    return JSON.parse(sessionStorage.getItem(key) as string);
  }
}

export function removeFromSessionStorage(key: string) {
  if (typeof window !== 'undefined') {
    return sessionStorage.removeItem(key);
  }
}

export function clearSessionStorage() {
  if (typeof window !== 'undefined') {
    return sessionStorage.clear();
  }
}