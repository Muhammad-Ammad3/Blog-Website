'use client'

import { useCategoryForm } from "./context/categoryFormContext";




export default function Page(){

const {
    data,
    isLoading,
    error,
    isDone,
    handleData,
    handleCreate,
    image,
    setImage,
} = useCategoryForm();

    return (
        <main className="w-full p-6 flex flex-col gap-3">
            <h1 className="font-semibold text-xl ">Category | Form</h1>
            <section className="flex">
            <form 
            onSubmit={(e)=>{
                e.preventDefault();
                handleCreate();
            }}
            className="flex flex-col gap-3 bg-blue-50 p-7 rounded-xl">
                <div className="flex flex-col gap-3">
                <label className="text-gray-500 text-sm">Category Name <span className="text-red-500">*</span></label>
                <input 
                className="px-4 py-2 border rounded-full bg-gray-100"
                placeholder="Enter Category Name"
                onChange={(e)=>{
                    handleData('name', e .target.value);
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
                onChange={(e)=>{
                    handleData('slug', e .target.value);
                }}
                value={data?.slug}
                type="text"
                required />
                </div>
                {
                    image && <div>
                        <img className="h-40" src={URL.createObjectURL(image)} alt="" />
                    </div>
                }
                <div className="flex flex-col gap-3">
                <label className="text-gray-500 text-sm">Image<span className="text-red-500">*</span></label>
                <input 
                className="px-4 py-2 border rounded-full bg-gray-100"
                placeholder="Enter Category Name"
                type="file"
                accept="image/*"
                onChange={(e)=>{
                    e.preventDefault();
                    setImage(e.target.files[0]);
                }}
                required />
                </div>
                <button className="bg-blue-500 rounded-full px-4 py-2 text-white"
                type="submit"
                >
                    Create
                </button>
            </form>
            </section>
        </main>
    )
}