/* eslint-disable @next/next/no-img-element */

import React, { useContext } from "react";
import AppMenuitem from "./AppMenuitem";
import { LayoutContext } from "./context/layoutcontext";
import { MenuProvider } from "./context/menucontext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppMenuItem } from "../types";
import { AuthenticationService } from "@/app/services/AuthenticationService";

const AppMenu = () => {
  const { layoutConfig } = useContext(LayoutContext);
  const router = useRouter();

  const logout = async () => {
    await AuthenticationService.logout();
    router.push("/login");
  };

  const model: AppMenuItem[] = [
    {
      label: "MAIN",
      items: [
        { label: "Dashboard", icon: "pi pi-fw pi-home", to: "/dashboard" },
        { label: "Results", icon: "pi pi-fw pi-list", to: "/results" },
      ],
    },
    {
      label: "SETTINGS",
      items: [
        { label: "Users", icon: "pi pi-fw pi-users", to: "/settings/users" },
        { label: "App", icon: "pi pi-fw pi-cog", to: "/settings/result" }
      ],
    },
    {
      label: "",
      items: [
        {
          label: "Logout",
          icon: "pi pi-fw pi-sign-out",
          command: () => logout(),
        },
      ],
    },
  ];

  return (
    <MenuProvider>
      <ul className="layout-menu">
        {model.map((item, i) => {
          return !item?.seperator ? (
            <AppMenuitem item={item} root={true} index={i} key={item.label} />
          ) : (
            <li className="menu-separator"></li>
          );
        })}
      </ul>
    </MenuProvider>
  );
};

export default AppMenu;
