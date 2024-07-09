import React from "react";
import { RiMenuUnfold4Line } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";

import GridSvgComponent from "../../../assets/Svg/Home";



const menuConfig = [
  {
    paths: ["/dashboard"],
    items: [
      {
        path: "/dashboard",
        name: "Clinics",
        icon: <GridSvgComponent />,
        activeName: "dashboard",
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
