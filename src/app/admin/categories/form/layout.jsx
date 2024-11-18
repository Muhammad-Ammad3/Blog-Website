import CategoryFormContextProvider from "./context/categoryFormContext";

export default function Layout({children}){
    return (
        <CategoryFormContextProvider>{children}</CategoryFormContextProvider>
    )
}