import DashboardLayout from "./dashboardLayout";
import YourLists from "@components/YourLists/yourList";

const Lists = () => {

    return (
        <DashboardLayout title="Your Lists">
            <p>These are all your lists</p>
            <YourLists/>
        </DashboardLayout>
    )
}
export default Lists
