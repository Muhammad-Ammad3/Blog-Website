'use client'

import { useSearchParams } from "next/navigation";
import { useCategoryForm } from "./context/categoryFormContext";
import { useEffect } from "react";




export default function Page() {
    const searchParams = useSearchParams();
    const updateCategoryId = searchParams.get('id')
    const {
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
    } = useCategoryForm();

    useEffect(()=>{
        if(updateCategoryId){
            fetchData(updateCategoryId);
        }
    },[updateCategoryId])

    return (
        <main className="w-full p-6 flex flex-col gap-3">
         <div className="flex gap-6 items-center">
            {updateCategoryId && <div className="flex">
                <h3 className="text-white bg-orange-500 px-4 py-2 rounded-full text-sm font-bold">Update</h3>
                </div>}
            {!updateCategoryId && <div className="flex">
                <h3 className="text-white bg-green-500 px-4 py-2 rounded-full text-sm font-bold">Create</h3>
                </div>}
         <h1 className="font-semibold text-xl ">Category | Form</h1>
         </div>
            <section className="flex">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        if(updateCategoryId){
                            handleUpdate();
                        }else{
                            handleCreate();
                        }
                    }}
                    className="flex flex-col gap-3 bg-blue-50 p-7 rounded-xl">
                    <div className="flex flex-col gap-3">
                        <label className="text-gray-500 text-sm">Category Name <span className="text-red-500">*</span></label>
                        <input
                            className="px-4 py-2 border rounded-full bg-gray-100"
                            placeholder="Enter Category Name"
                            onChange={(e) => {
                                handleData('name', e.target.value);
                            }}
                            value={data?.name}
                            type="text"
                            required />
                    </div>
                    <div className="flex flex-col gap-3">
                        <label className="text-gray-500 text-sm">Category Slug <span className="text-red-500">*</span></label>
                        <input
                            className="px-4 py-2 border rounded-full bg-gray-100"
                            placeholder="Enter Category Slug"
                            onChange={(e) => {
                                handleData('slug', e.target.value);
                            }}
                            value={data?.slug}
                            type="text"
                            required />
                    </div>
                    {
                        data?.iconURL && <div>
                            <img className="h-24" src={data?.iconURL} alt="" />
                        </div>
                    }
                    {
                        image && <div>
                            <img className="h-24" src={URL.createObjectURL(image)} alt="" />
                        </div>
                    }
                    <div className="flex flex-col gap-3">
                        <label className="text-gray-500 text-sm">Image</label>
                        <input
                            className="px-4 py-2 border rounded-full bg-gray-100"
                            placeholder="Enter Category Name"
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                e.preventDefault();
                                setImage(e.target.files[0]);
                            }}
                             />
                    </div>
                    {error && <p className="text-red-500 text-md">{error}</p>}
                    { !isDone &&  <button 
                    className="bg-blue-500 rounded-full px-4 py-2 text-white"
                    type="submit"
                    disabled = {isLoading || isDone}
                    >
                        {isLoading ? "Loading..." : updateCategoryId ? 'Update' : "Create"}
                    </button>}
                    {isDone && <h3 className="text-green-500 font-bold text-center">
                        Succesfully { updateCategoryId ? 'Updated' : 'Created'} !
                        </h3>}
                </form>
            </section>
        </main>
    )
}