import { createBrowserRouter } from "react-router-dom";

import ForgotPassword from "../../Pages/Auth/ForgotPassword";
import Login from "../../Pages/Auth/Login";
import NewPassword from "../../Pages/Auth/NewPassword";
import OTPVerify from "../../Pages/Auth/OTPVerify";
import MainLayout from "../Layout/MainLayout";
import ErrorPage from "../UI/ErrorPage";
import { Dashboard } from "../dashboard/Dashboard/Dashboard";

import BookingManage from "../dashboard/BookingManage/BookingManage";
import CarManage from "../dashboard/CarManage/CarManage";
import GuestsManage from "../dashboard/GuestsManage/GuestsManage";
import HostRequest from "../dashboard/HostRequest/HostRequest";
import HostsManage from "../dashboard/HostsManage/HostsManage";
import Payments from "../dashboard/Payments/Payments";
import Settings from "../dashboard/Settings/Settings";
import Verification from "../dashboard/Verification/Verification";
import Notifications from "../dashboard/Notifications/Notifications";
import AdminList from "../dashboard/AdminList/AdminList";
import MovieSeriesManage from "../dashboard/MovieSeriesManage/MovieSeriesManage";
import Genres from "../dashboard/Genres/Genres";
import UserList from "../dashboard/UserList/UserList";


const router = createBrowserRouter([
    {
        path: "/",
        // element: <PrivateRoute> <MainLayout /> </PrivateRoute>,
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
                path: "content-manage",
                element: <MovieSeriesManage />
            },                              
            {
                path: "genres",
                element: <Genres />
            },                              
            {
                path: "verification",
                element: <Verification />
            },
         
            {
                path: "settings",
                element: <Settings />
            },
            {
                path: "all-admin",
                element: <AdminList />
            },
            // {
            //     path: "terms-condition",
            //     element: <TermsCondition />
            // },

            // {
            //     path: "about",
            //     element: <About/>
            // },
            // {
            //     path: "faq",
            //     element: <FAQ/>
            // },
            // {
            //     path: "policy",
            //     element: <PrivacyPolicy/>
            // },
            // {
            //     path: "policy",
            //     element: <PrivacyPolicy/>
            // },
        ]
    },
    {path: "/login", element: <Login />},
    {path: "/forgot-password", element: <ForgotPassword />},
    {path: "/verify-otp", element: <OTPVerify />},
    {path: "/new-password", element: <NewPassword />},
]);



export default router;