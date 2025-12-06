import { createBrowserRouter } from "react-router-dom";

import ForgotPassword from "../../Pages/Auth/ForgotPassword";
import Login from "../../Pages/Auth/Login";
import NewPassword from "../../Pages/Auth/NewPassword";
import OTPVerify from "../../Pages/Auth/OTPVerify";
import MainLayout from "../Layout/MainLayout";
import ErrorPage from "../UI/ErrorPage";
import { Dashboard } from "../dashboard/Dashboard/Dashboard";

import Notifications from "../dashboard/Notifications/Notifications";
import AdminList from "../dashboard/AdminList/AdminList";
import Genres from "../dashboard/Genres/Genres";
import UserList from "../dashboard/UserList/UserList";
import CampaignsList from "../dashboard/CampaignsList/CampaignsList";
import Settings from "../dashboard/Settings/Settings";


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "",
                element: <Dashboard />
            },
            {
                path: "dashboard",
                element: <Dashboard />
            },
            {
                path: "notifications",
                element: <Notifications />
            },
            {
                path: "users",
                element: <UserList />
            },                              
            {
                path: "campaigns-list",
                element: <CampaignsList />
            },                                                                       
            {
                path: "genres",
                element: <Genres />
            },                              
           
            {
                path: "settings",
                element: <Settings />
            },
            {
                path: "all-admin",
                element: <AdminList />
            },
        ]
    },
    {path: "/login", element: <Login />},
    {path: "/forgot-password", element: <ForgotPassword />},
    {path: "/verify-otp", element: <OTPVerify />},
    {path: "/new-password", element: <NewPassword />},
]);

export default router;
