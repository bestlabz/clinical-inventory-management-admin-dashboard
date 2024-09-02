import React from "react";
import { RiMenuUnfold4Line } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";

import GridSvgComponent from "../../../assets/Svg/Home";
import { PiCurrencyInrBold } from "react-icons/pi";
import { MdOutlinePolicy } from "react-icons/md";
import { BiSupport } from "react-icons/bi";



const menuConfig = [
  {
    paths: ["/dashboard", "/subscription", "/policys", "/help-support"],
    items: [
      {
        path: "/dashboard",
        name: "Clinics",
        icon: <GridSvgComponent />,
        activeName: "dashboard",
      },
      {
        path: "/subscription",
        name: "Subscription",
        icon: <PiCurrencyInrBold size={25} />,
        activeName: "Subscription",
      },
      {
        path: "/policys",
        name: "Policies",
        icon: <MdOutlinePolicy size={25} />,
        activeName: "Policies",
      },
      {
        path: "/help-support",
        name: "Help Support",
        icon: <BiSupport size={25} />,
        activeName: "Help Support ",
      },
    ],
  },
];

const Sidemenu = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getMenuItems = () => {
    const pathWithoutParams = location.pathname.replace(/\/\d+/g, "");

    for (const config of menuConfig) {
      if (config.paths.includes(pathWithoutParams)) {
        return [
          {
            path: location.pathname,
            name: "Menu",
            icon: <RiMenuUnfold4Line size={35} className="" />,
            activeName: "menu",
          },
          
          ...config.items.map((item) => ({
            ...item,
            // path: item.path.replace(":id", ID),
          })),
        ];
      }
    }

    return [];
  };

  // React.useEffect(() => {
  //   if (
  //     (!ID && location.pathname.startsWith("/store-dashboard")) ||
  //     (!ID && location.pathname.startsWith("/all-items")) ||
  //     (!ID && location.pathname.startsWith("/category")) ||
  //     (!ID && location.pathname.startsWith("/clerks"))
  //   ) {
  //     navigate("/store");
  //   }
  // }, [ID, location.pathname, navigate]);

  return {
    MenuItem: getMenuItems,
  };
};

export default Sidemenu;
