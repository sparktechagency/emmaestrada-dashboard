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
import UserList from "../dashboard/UserList/UserList";
import CampaignsList from "../dashboard/CampaignsList/CampaignsList";
import Settings from "../dashboard/Settings/Settings";
import CommissionManage from "../dashboard/CommissionManage/CommissionManage";
import CategoryManage from "../dashboard/CategoryManage/CategoryManage";
import PrivateRoute from "./PrivateRoute";
import SliderManage from "../dashboard/SlidersManage/SlidersManage";
import WithdrawManage from "../dashboard/WithdrawManage/WithdrawManage";
import PlannerManage from "../dashboard/PlannerManage/PlannerManage";
import ReportManage from "../dashboard/Reports/ReportManage";



const router = createBrowserRouter([
    {
        path: "/",
        // element: <MainLayout />,
        element: <PrivateRoute> <MainLayout /></PrivateRoute>,
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
                path: "sliders-manage",
                element: <SliderManage />
            },
            {
                path: "category-manage",
                element: <CategoryManage />
            },
            {
                path: "withdraw-manage",
                element: <WithdrawManage />
            },
            {
                path: "planner-manage",
                element: <PlannerManage />
            },
            {
                path: "commission-manage",
                element: <CommissionManage />
            },
            {
                path: "report-manage",
                element: <ReportManage />
            },
            {
                path: "campaigns-list",
                element: <CampaignsList />
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
    { path: "/login", element: <Login /> },
    { path: "/forgot-password", element: <ForgotPassword /> },
    { path: "/verify-otp", element: <OTPVerify /> },
    { path: "/new-password", element: <NewPassword /> },
]);

export default router;
