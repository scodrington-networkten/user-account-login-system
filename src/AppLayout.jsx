
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
const AppLayout = ({children}) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto p-4">
                {children}
            </main>
            <Footer />
        </div>
    )
}
export default AppLayout;
