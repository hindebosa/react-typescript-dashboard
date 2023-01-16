import { RouteProps, Outlet } from "react-router";
import type { RouteObject } from "react-router";

import { Ecommerce } from "../pages";
import Dashboard from "../components/Dashboard";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import AddProduct from "../pages/AddProduct";

import AuthGuard from "./AuthGuard";
//@ts-ignore
export interface PrivateRouteObject extends RouteProps {
  exact: boolean;
  path: string;
  breadcrumb: any;
  component: any;
  title: string;
}

const NavbarWrapper = () => {
  return (
    <>
      <Dashboard>
        <Outlet />
      </Dashboard>
    </>
  );
};

export const routes: RouteObject[] = [
  {
    path: "auth",
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/",
    element: <NavbarWrapper />,
    children: [
      {
        index: true,
        path: "home",
        element: (
          <AuthGuard>
            <Ecommerce />
          </AuthGuard>
        ),
      },
      {
        index: true,
        path: "addproduct",
        element: (
          <AuthGuard>
            <AddProduct />
          </AuthGuard>
        ),
      },
    ],
  },
];
