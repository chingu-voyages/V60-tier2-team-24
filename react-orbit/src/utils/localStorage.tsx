// Setting up the data stored in the local storage
type Application = {
  CompanyName: string;
  Role: string;
  DateApplied: string;
  Status: string;
  Notes: string;
};

type LocalStorageSchema = {
  applications: Application[]; // JSON stringified array of Application objects
};

// Created a Keys type that is a union of the keys of the localstorage schema.
type Keys = keyof LocalStorageSchema;

export const LocalStorage = {
  get<K extends Keys>(key: K): LocalStorageSchema[K] | null {
    const value = window.localStorage.getItem(key);
    // if the value is not null, return it as the correct type, otherwise log an error and return null
    if (value !== null) {
      return JSON.parse(value) as LocalStorageSchema[K];
    }
    // if the value is null, log an error and return null
    console.error(`no value found in localStorage for key: ${key}`);
    return null;
  },
  set<K extends Keys>(key: K, value: LocalStorageSchema[K]) {
    window.localStorage.setItem(key, JSON.stringify(value));
  },
  // this is the update function, k will extend keys.
  update<K extends Keys>(key: K, value: Partial<LocalStorageSchema[K]>) {
    const existingValue = this.get(key);
    if (existingValue) {
      const updatedValue = { ...existingValue, ...value };
      this.set(key, updatedValue);
    } else {
      console.error(`no existing value found in localStorage for key: ${key}`);
    }
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
