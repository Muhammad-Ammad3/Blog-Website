"use client"

import Link from "next/link";
import { useCategories } from "../../../../../lib/firebase/catetgory/read"

export default function CategoriesListView(){
    const { data , error , isLoading } = useCategories();
    if(isLoading){
        return <h1>Loading...</h1>
    }
    if(error){
        return <h1>{error}</h1>
    }
    if(!data){
        return <h1>Data is not found</h1>
    }
    return(
        <section>
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="border px-4 py-2 bg-bl">Sr.</th>
                        <th className="border px-4 py-2 bg-bl">Icon</th>
                        <th className="border px-4 py-2 bg-bl">Name</th>
                        <th className="border px-4 py-2 bg-bl">Slug</th>
                        <th className="border px-4 py-2 bg-bl">Action</th>
                    </tr>
                </thead>
                <tbody>
                {data?.map((item , key) => {
                return <tr>
                    <td className="border px-4 py-2">{key + 1}</td>
                    <td className="border px-4 py-2"><img className="h-16" src={item?.iconURL} alt="" /></td>
                    <td className="border px-4 py-2">{item?.name}</td>
                    <td className="border px-4 py-2">{item?.slug}</td>
                    <td className="border px-4 py-2 items-center">
                        <Link href={`/admin/categories/form?id=${item?.id}`}>
                        <button className="bg-blue-500 px-2 py-1 text-sm rounded-full text-white">Action</button>
                        </Link>
                    </td>
                </tr>
            })}
                </tbody>
            </table>
          
        </section>
    )
}