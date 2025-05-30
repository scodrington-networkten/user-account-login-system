
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
const AppLayout = ({children}) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow mx-auto w-full">
                {children}
            </main>
            <Footer />
        </div>
    )
}
export default AppLayout;
