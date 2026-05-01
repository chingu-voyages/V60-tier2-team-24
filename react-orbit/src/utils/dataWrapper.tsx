import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { ApplicationInput } from "@/lib/application";
import { db } from "@/lib/firebase";

export type Application = ApplicationInput & {
  id: string;
  userId: string;
};

const COLLECTION_NAME = "applications";

export const dataWrapper = {
  async getApplications(userId: string): Promise<Application[]> {
    const applicationsQuery = query(
      collection(db, COLLECTION_NAME),
      where("userId", "==", userId),
    );
    const snapshot = await getDocs(applicationsQuery);

    return snapshot.docs.map((doc) => {
      const data = doc.data() as ApplicationInput & { userId: string };

      return {
        id: doc.id,
        ...data,
      };
    });
  },

  async addApplication(userId: string, application: ApplicationInput) {
    const applicationWithOwner = {
      ...application,
      userId,
    };
    const docRef = await addDoc(
      collection(db, COLLECTION_NAME),
      applicationWithOwner,
    );

    return {
      id: docRef.id,
      ...applicationWithOwner,
    };
  },

  // Update a specific application by id with partial changes

  async updateApplication(
    userId: string,
    id: string,
    changes: Partial<ApplicationInput>,
  ) {
    const docRef = doc(db, COLLECTION_NAME, id);

    await updateDoc(docRef, {
      ...changes,
      userId,
    });
  },

  // Remove a specific application by id

  async removeApplication(id: string) {
    const docRef = doc(db, COLLECTION_NAME, id);

    await deleteDoc(docRef);
  },
};
