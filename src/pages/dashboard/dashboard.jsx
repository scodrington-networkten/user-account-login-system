
import UserForm from "@components/dashboard/userForm/userForm.tsx";
import DashboardLayout from "./dashboardLayout.jsx";

const Dashboard = () => {

    return (
        <DashboardLayout title="Dashboard">
            <UserForm/>
        </DashboardLayout>
    )
}

export default Dashboard;

