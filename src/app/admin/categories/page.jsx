import { CopyPlus } from "lucide-react";
import Link from "next/link";
import CategoriesListView from "./components/CategoriesListView";

export default function Page(){
    return (
        <main className="p-6 w-full flex flex-col gap-8">
    <div className="flex justify-between items-center">
    <h1 className="font-semibold text-xl">Categories</h1>
           <Link href={'/admin/categories/form'}>
           <button className="bg-blue-400 flex gap-3 items-center px-4 py-2 text-white rounded-full font-bold">
            <CopyPlus />
                Add
            </button>
           </Link>
    </div>
    <CategoriesListView/>
        </main>
    )
}