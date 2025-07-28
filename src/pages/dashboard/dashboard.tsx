
import UserForm from "@components/dashboard/userForm/userForm";
import DashboardLayout from "./dashboardLayout";

const Dashboard = () => {

    return (
        <DashboardLayout title="Dashboard">
            <UserForm/>
        </DashboardLayout>
    )
}

export default Dashboard;

