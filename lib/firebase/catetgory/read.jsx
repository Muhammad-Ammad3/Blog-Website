"use client";

import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../FireBase";

export const fetchCategories = async () => {
  console.log("Fetching all categories...");
  try {
    const querySnapshot = await getDocs(collection(db, 'categories'));
    const categories = querySnapshot.docs.map(doc => doc.data());
    console.log(`Fetched ${categories.length} categories`);
    return categories;
  } catch (error) {
    console.error("Error fetching categories: ", error);
    throw new Error(`Error fetching categories: ${error.message}`);
  }
};

export const getCategory = async (id) => {
  console.log(`Fetching category with ID: ${id}`);
  try {
    const docRef = doc(db, `categories/${id}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log(`Category with ID: ${id} found`);
      return docSnap.data();
    } else {
      console.warn(`No category found with ID: ${id}`);
      throw new Error(`No category found with ID: ${id}`);
    }
  } catch (error) {
    console.error(`Error fetching category with ID: ${id}: `, error);
    throw new Error(`Error fetching category: ${error.message}`);
  }
};
