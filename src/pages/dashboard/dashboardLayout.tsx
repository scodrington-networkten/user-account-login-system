import UserActionsSidebar from "@components/sidebar/userActionsSidebar";
import React from "react";


type DashboardLayoutProps = React.PropsWithChildren<{
    title: string
}>
const DashboardLayout = ({children, title = 'Page title '} : DashboardLayoutProps) => {

    return (

            <div className="flex flex-wrap md:flex-nowrap gap-4 mb-2 mt-2 md:gap-4">
                <div className="left w-full md:flex-1/3 lg:flex-1/4">
                    <UserActionsSidebar/>
                </div>
                <div className="right w-full md:flex-2/3 lg:flex-3/4">
                    <h1 className="text-3xl mb-2">{title}</h1>
                    {children}
                </div>
            </div>

    )
}
export default DashboardLayout
