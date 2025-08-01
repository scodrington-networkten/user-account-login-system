import DashboardLayout from "./dashboardLayout";
import FavoriteList from "@components/favoritesList/favoriteList";

const Favorites = () => {

    return (
        <DashboardLayout title="Favorites">
            <p>These are your favorites, how fancy</p>
            <FavoriteList/>
        </DashboardLayout>
    )
}
export default Favorites;
