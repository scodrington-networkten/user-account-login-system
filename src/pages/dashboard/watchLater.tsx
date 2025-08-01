import DashboardLayout from "./dashboardLayout";
import WatchLaterList from "@components/watchLaterList/watchLaterList";

const WatchLater = () => {

    return (
        <DashboardLayout title="Watch Later">
            <p>Here's all your movies, what are you watching next?</p>
            <WatchLaterList/>
        </DashboardLayout>

    )
}
export default WatchLater;
