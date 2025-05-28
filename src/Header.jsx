const Header = () => {
    return (
        <header className="text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <span className="text-xl font-bold">MovieSearch</span>
                <nav className="space-x-4">
                    <a href="#" className="hover:underline">Home</a>
                    <a href="#" className="hover:underline">About</a>
                    <a href="#" className="hover:underline">Contact</a>
                </nav>
            </div>
        </header>
    )
}
export default Header;
