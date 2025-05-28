const Footer = () => {
    return(
        <footer className="bg-gray-100 text-gray-600 p-4 mt-auto">
            <div className="container mx-auto text-center">
                &copy; {new Date().getFullYear()} My Web App. All rights reserved.
            </div>
        </footer>
    )
}
export default Footer;
