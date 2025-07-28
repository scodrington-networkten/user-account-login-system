import DashboardLayout from "./dashboardLayout";
import FavoriteList from "@components/favoritesList/favoriteList";

const Favorites = () => {

    return (
        <DashboardLayout title="Favorites">
            <FavoriteList/>
        </DashboardLayout>
    )
}
export default Favorites;
