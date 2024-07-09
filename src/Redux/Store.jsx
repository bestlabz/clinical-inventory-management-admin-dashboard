import { configureStore } from "@reduxjs/toolkit";

import User from "./Slice/User";
import Sidebar from "./Slice/Sidebar";
import OTP from './Slice/Otp'
import Signup from './Slice/SignupUser'
import Clinic from './Slice/Clinic'
import Pagination from "./Slice/pagination";
import DetailsPage from "./Slice/DetailsPage";

const store = configureStore({
  reducer: {
    userinfo: User,
    sidebarInfo: Sidebar,
    otpValue: OTP,
    Signup:Signup,
    Clinic,
    pagination: Pagination,
    DetailsPage

  },
});

export default store;
