
import { Link } from "react-router-dom";
const Header = () => {
    return (
        <header className="text-white p-4 shadow-md bg-gray-900">
            <div className="container mx-auto flex justify-between items-center">
                <span className="text-xl font-bold">MovieSearch</span>
                <nav className="space-x-4">
                    <Link to="/" className="hover:underline">Home</Link>
                    <Link to="/movies" className="hover:underline">Movies</Link>
                    <Link to="/dashboard" className="hover:underline">Dashboard</Link>
                </nav>
            </div>
        </header>
    )
}
export default Header;
