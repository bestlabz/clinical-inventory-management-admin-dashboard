import { configureStore } from "@reduxjs/toolkit";

import User from "./Slice/User";
import Sidebar from "./Slice/Sidebar";
import OTP from "./Slice/Otpinput";
import Signup from "./Slice/SignupUser";
import Clinic from "./Slice/Clinic";
import Pagination from "./Slice/pagination";
import DetailsPage from "./Slice/DetailsPage";
import Subscription from "./Slice/Subscription";
import Notification from "./Slice/Notification";
import StaffList from "./Slice/StaffList";

const store = configureStore({
  reducer: {
    userinfo: User,
    sidebarInfo: Sidebar,
    otpValue: OTP,
    Signup: Signup,
    Clinic,
    pagination: Pagination,
    DetailsPage,
    subscription: Subscription,
    notification: Notification,
    staffList: StaffList,
  },
});

export default store;
