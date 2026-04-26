import { Application } from "@/lib/application";
import { ApplicationStatus } from "@/constants/applicationStatus";

export type { Application };

type LocalStorageSchema = {
  applications: Application[]; // JSON stringified array of Application objects
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
  // Update a specific application by index with partial changes
  updateApplication(index: number, changes: Partial<Application>) {
    const apps = this.get("applications") || [];
    if (index < 0 || index >= apps.length) {
      console.error(`Invalid index: ${index}`);
      return;
    }
    apps[index] = { ...apps[index], ...changes };
    this.set("applications", apps);
    return apps;
  },
  // Remove a specific application by index
  removeApplication(index: number) {
    const apps = this.get("applications") || [];
    if (index < 0 || index >= apps.length) {
      console.error(`Invalid index: ${index}`);
      return;
    }
    apps.splice(index, 1);
    this.set("applications", apps);
    return apps;
  },
  clear() {
    window.localStorage.clear();
  },
};
