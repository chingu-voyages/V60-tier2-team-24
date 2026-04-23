import { ApplicationStatus } from "@/constants/applicationStatus";

type LocalStorageSchema = {
  "applications-status-filter": ApplicationStatus[];
  sidebar_state: boolean;
};

// Created a Keys type that is a union of the keys of the localstorage schema.
type Keys = keyof LocalStorageSchema;

export const LocalStorage = {
  get<K extends Keys>(key: K): LocalStorageSchema[K] | null {
    const value = window.localStorage.getItem(key);
    if (value === null) return null;

    try {
      return JSON.parse(value) as LocalStorageSchema[K];
    } catch {
      console.error(`Invalid localStorage value for key: ${key}`);
      return null;
    }
  },
  set<K extends Keys>(key: K, value: LocalStorageSchema[K]) {
    window.localStorage.setItem(key, JSON.stringify(value));
  },

  clear() {
    window.localStorage.clear();
  },
};
