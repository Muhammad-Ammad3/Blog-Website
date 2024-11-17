import { House, List, MessageCircle } from "lucide-react";
import LoginButton from "./LoginButton";
import AuthContextProvider from "../../../../lib/context/AuthContext";
import Link from "next/link";

export default function Header(){
    return(
        <nav className="flex justify-between items-center px-7 py-3 border-b">
            <Link href = {'/'}>
            <img className=" w-20" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsAs51WgO3fpF4MrXLymp1SwA0sCXaht6_CiXmys1m3J0Qm3HnsBofkCI&s" alt="" />
            </Link>
            <ul className="flex item-center gap-12">
                <li className="flex items-center gap-2">
                <House />
                Home
                </li>
                <li className="flex items-center gap-2">
                <List />    
                Blogs
                </li>
                <li className="flex items-center gap-2">
                <MessageCircle />
                Contact Us
                </li>
            </ul>
            <AuthContextProvider>
         <LoginButton/>
            </AuthContextProvider>
        </nav>
    )
}