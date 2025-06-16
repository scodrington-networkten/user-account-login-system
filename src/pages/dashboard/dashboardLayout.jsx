import Sidebar from "@components/sidebar/sidebar.jsx";


const DashboardLayout = ({children, title = 'Page title '}) => {

    return (
        <div className="container mx-auto mt-2 mb-2 px-2">
            <div className="flex sm:flex-wrap md:flex-nowrap gap-4 mb-2 mt-2 md:gap-4">
                <div className="left w-full md:flex-1/4">
                    <Sidebar/>
                </div>
                <div className="right w-full md:flex-3/4">
                    <h1 className="text-3xl mb-2">{title}</h1>
                    {children}
                </div>
            </div>
        </div>
    )
}
export default DashboardLayout
