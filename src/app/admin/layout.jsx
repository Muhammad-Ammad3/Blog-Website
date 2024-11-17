import AuthContextProvider from "../../../lib/context/AuthContext";
import SideBar from "./component/SideBar";

export default function Layout({children}){
    return <>
    <AuthContextProvider>
        <section className="flex">
    <SideBar/>
    {children}
        </section>
    </AuthContextProvider>
    </>
}