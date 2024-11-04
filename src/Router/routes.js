import { Home, Users } from "../pages";

export const routes = [
  {
    path: "/",
    element: Home,
    permission: "",
    pageTitle: "Home",
  },
  {
    path: "/home",
    element: Home,
    permission: "",
    pageTitle: "Home",
  },
  {
    path: "/users",
    element: Users,
    permission: "View Users",
    pageTitle: "Users",
  },
];
