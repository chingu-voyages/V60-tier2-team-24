import { ApplicationInput } from "@/lib/application";
export type Application = ApplicationInput & { id: string };
import { addDoc, collection,deleteDoc,doc,getDocs, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";

const COLLECTION_NAME = "applications";

export const LocalStorage = {

  async getApplications(): Promise<Application[]> {
    const snapshot = await getDocs(collection(db, COLLECTION_NAME));

    return snapshot.docs.map((doc) => {
      const data = doc.data() as ApplicationInput;
      console.log(doc.id);

      return {
        id: doc.id,
        ...data,
      }
    })
  },

  async addApplication(application: Application) {
    await addDoc(collection(db, COLLECTION_NAME), application);
    return application;
  },

  // Update a specific application by index with partial changes

  async updateApplication(index: number, changes: Partial<Application>) {
    const apps = await this.getApplications();

    if (index < 0 || index >= apps.length) {
      console.error(`Invalid index: ${index}`);
      return;
    }

    const appToUpdate = apps[index];
    const docRef = doc(db, COLLECTION_NAME, appToUpdate.id);

    await updateDoc(docRef, changes);

    return this.getApplications();
  },
  
  // Remove a specific application by index

  async removeApplication(index: number) {
    const apps = await this.getApplications();

    if (index < 0 || index >= apps.length) {
      console.error(`Invalid index: ${index}`);
      return;
    }

    const appToDelete = apps[index];
    const docRef = doc(db, COLLECTION_NAME, appToDelete.id);

    await deleteDoc(docRef);

    return this.getApplications();
  },
};
