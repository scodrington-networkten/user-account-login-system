const Footer = () => {
    return (
        <footer className=" bg-[var(--color-secondary)] text-gray-200 p-4">
            <div className="container mx-auto text-center">
                &copy; {new Date().getFullYear()} MovieSearch Systems. All rights reserved.
            </div>
        </footer>
    )
}
export default Footer;
