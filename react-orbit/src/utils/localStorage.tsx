import { ApplicationInput } from "@/lib/application";
export type Application = ApplicationInput & { id: string };
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase";

const COLLECTION_NAME = "applications";

export const LocalStorage = {
  async getApplications(): Promise<Application[]> {
    const snapshot = await getDocs(collection(db, COLLECTION_NAME));

    return snapshot.docs.map((doc) => {
      const data = doc.data() as ApplicationInput;

      return {
        id: doc.id,
        ...data,
      };
    });
  },

  async addApplication(application: ApplicationInput) {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), application);
    return {
      id: docRef.id,
      ...application,
    };
  },

  // Update a specific application by index with partial changes

  async updateApplication(id: string, changes: Partial<Application>) {
    const docRef = doc(db, COLLECTION_NAME, id);

    await updateDoc(docRef, changes);

    return this.getApplications();
  },

  // Remove a specific application by index

  async removeApplication(id: string) {
    const docRef = doc(db, COLLECTION_NAME, id);

    await deleteDoc(docRef);

    return this.getApplications();
  },
};
