import { Boxes, Group, Package, Users, Home, Settings } from "lucide-react";

export const menu = [
  { Icon: Home, title: "Dashboard", to: "/home", permission: "" },
  { Icon: Boxes, title: "Vendors", to: "/vendors", permission: "" },
  { Icon: Package, title: "Orders", to: "/orders", permission: "" },
  {
    Icon: Settings,
    title: "Settings",
    to: "/settings",
    permission: "Settings",
    children: [
      { Icon: Users, title: "Users", to: "/users", permission: "View Users" },
      { Icon: Group, title: "Roles", to: "/roles", permission: "view roles" },
    ],
  },
  { Icon: Package, title: "Products", to: "/products", permission: "" },
];
