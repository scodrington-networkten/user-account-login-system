import DashboardLayout from "./dashboardLayout.jsx";
import FavoriteList from "@components/favoritesList/favoriteList.jsx";

const Favorites = () => {

    return (
        <DashboardLayout title="Favorites">
            <FavoriteList/>
        </DashboardLayout>
    )
}
export default Favorites;
