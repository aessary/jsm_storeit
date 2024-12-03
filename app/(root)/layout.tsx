import React from "react";
import MobileNavigation from "@/components/MobileNavigation";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import {getCurrentUser} from "@/lib/actions/user.actions";
import Interceptors from "undici-types/interceptors";
import {redirect} from "next/navigation";

 const  Layout= async ({ children }: { children:
    React.ReactNode })=> {
    const currentUser = await getCurrentUser();
    if(!currentUser)
        return redirect("/sign-in");

    return (
        <main className="flex h-screen">
            <Sidebar {...currentUser}
            />
            <section className="flex h-full flex-1 flex-col">
                <MobileNavigation />
                <Header />
                <div className="main-content">{children}</div>
            </section>
        </main>
    );
}

export default Layout;

