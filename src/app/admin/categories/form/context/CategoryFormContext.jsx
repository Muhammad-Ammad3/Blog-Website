"use client"

import { createContext, useContext, useState } from "react";
import { createNewCategory, updateCategory } from "../../../../../../lib/firebase/catetgory/write";
import { getCategory } from "../../../../../../lib/firebase/catetgory/read";

const CategoryFormContext = createContext();

export default function CategoryFormContextProvider({ children }) {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isDone, setIsDone] = useState(false);
    const [image, setImage] = useState(null);

    const handleData = (key, value) => {
        setIsDone(false);
        setData({
            ...data,
            [key]: value,
        });
    };

    const handleCreate = async () => {
        setIsLoading(true);
        setError(null);
        setIsDone(false); 
        try {
            await createNewCategory({ data: data, image: image });
            setIsDone(true); 
        } catch (error) {
            setError(error?.message);
        }
        setIsLoading(false);
    };
    
    const handleUpdate = async () => {
        setIsLoading(true);
        setError(null);
        setIsDone(false); 
        try {
            await updateCategory({ data: data, image: image });
            setIsDone(true);
        } catch (error) {
            setError(error?.message);
        }
        setIsLoading(false);
    };
    

    const fetchData = async (id) => {
        setIsLoading(true);
        setError(null);
        setIsDone(false);
        try {
            const res = await getCategory(id);
            if (res.exists()) {
                setData(res.data()); 
            } else {
                throw new Error(`No category found for id ${id}`);
            }
        } catch (error) {
            setError(error?.message); 
        }
        setIsLoading(false);
    };

    return (
        <CategoryFormContext.Provider value={{
            data,
            isLoading,
            error,
            isDone,
            handleData,
            handleCreate,
            handleUpdate,
            image,
            setImage,
            fetchData,
        }}>
            {children}
        </CategoryFormContext.Provider>
    );
}

export const useCategoryForm = () => useContext(CategoryFormContext);
