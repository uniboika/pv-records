import React from "react";
import { useRoutes } from "react-router-dom";
import Dashboard from "../component/dashboard/Dashboard";
import Pv from "../component/pv/Pv";
import Analytics from "../component/analytics/Analytics";
import Wallets from "../component/wallet/Wallets";
import PvPdf from "../component/analytics/PVPDF";
// import SignIn from "../component/signin/SignIn";
export default function AppNavigation() {
  let Pages = useRoutes([
    {
      path: "/",
      element: <Dashboard />,
    },
    // {
    //   path: "/dashboard",
    //   element: <Dashboard />,
    // },
    {
      path: "/pvregistration",
      element: <Pv />,
    },
    {
      path: "/analytics",
      element: <Analytics />
    },
    {
      path: "/print",
      element: <PvPdf />
    },
    {
      path: "/wallet",
      element: <Wallets />
    },
    {
      path: "/printpdf",
      element: <PvPdf />
    }
  ]);
  return Pages;
}
