import DashboardLayout from "./dashboardLayout.jsx";
import FavoriteList from "@components/favoritesList/favoriteList.tsx";

const Favorites = () => {

    return (
        <DashboardLayout title="Favorites">
            <FavoriteList/>
        </DashboardLayout>
    )
}
export default Favorites;
