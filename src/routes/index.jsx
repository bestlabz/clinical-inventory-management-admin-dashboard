import { lazy } from "react";

// use lazy for better code splitting
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const Subscription = lazy(() => import("../pages/Subscription/Subscription"));
const Policy = lazy(() => import("../pages/Policy/Policy"));
const Help = lazy(() => import("../pages/help/Help"));



const routes = [
  {
    path: "/dashboard",
    component: Dashboard,
  },
  {
    path: "/subscription",
    component: Subscription,
  },
  {
    path: "/policys",
    component: Policy,
  },
  {
    path: "/help-support",
    component: Help,
  },
];

export default routes;
