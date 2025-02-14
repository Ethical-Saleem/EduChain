/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { classNames } from "primereact/utils";
import React, {
  useState,
  useEffect,
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
} from "react";
import { AppTopbarRef } from "../types";
import { LayoutContext } from "./context/layoutcontext";
import { AuthenticationService } from "@/app/services/AuthenticationService";
import { Demo } from "../types";
import Image from "next/image";
import DefaultLogo from "@/app/ui/default-logo";
import NavLogo from "@/app/ui/nav-educhain-logo";

const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
  const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar } =
    useContext(LayoutContext);
  const menubuttonRef = useRef(null);
  const topbarmenuRef = useRef(null);
  const topbarmenubuttonRef = useRef(null);

  const [currentUser, setCurrentUser] = useState<Demo.TokenModel | null>(null);

  useEffect(() => {
    const user = AuthenticationService.currentUserValue;
    setCurrentUser(user);
    console.log("user", user);
  }, [currentUser]);

  useImperativeHandle(ref, () => ({
    menubutton: menubuttonRef.current,
    topbarmenu: topbarmenuRef.current,
    topbarmenubutton: topbarmenubuttonRef.current,
  }));

  return (
    <div className="layout-topbar">
      <Link href="/dashboard" className="layout-topbar-logo text-white">
        <NavLogo />
      </Link>

      <button
        ref={menubuttonRef}
        type="button"
        className="p-link layout-menu-button layout-topbar-button"
        onClick={onMenuToggle}
      >
        <i className="pi pi-bars" />
      </button>

      <div className="flex items-center px-3">
        {currentUser?.school?.logoUrl ? (
          <Image
            src={currentUser?.school?.logoUrl}
            width={60}
            height={60}
            className="hidden md:block mr-2"
            alt="Sch. Logo"
          />
        ) : (
          <DefaultLogo />
        )}
        <p className="font-bold text-base sm:text-xl lg:text-2xl hidden md:block">
          {currentUser?.school?.name}
        </p>
      </div>

      <button
        ref={topbarmenubuttonRef}
        type="button"
        className="p-link layout-topbar-menu-button layout-topbar-button"
        onClick={showProfileSidebar}
      >
        <i className="pi pi-ellipsis-v" />
      </button>

      <div
        ref={topbarmenuRef}
        className={classNames("layout-topbar-menu", {
          "layout-topbar-menu-mobile-active": layoutState.profileSidebarVisible,
        })}
      >
        <button type="button" className="p-link layout-topbar-button">
          <i className="pi pi-calendar"></i>
          <span>Calendar</span>
        </button>
        <button type="button" className="p-link layout-topbar-button">
          <i className="pi pi-user"></i>
          <span>Profile</span>
        </button>
        <Link href="/documentation">
          <button type="button" className="p-link layout-topbar-button">
            <i className="pi pi-cog"></i>
            <span>Settings</span>
          </button>
        </Link>
      </div>
    </div>
  );
});

AppTopbar.displayName = "AppTopbar";

export default AppTopbar;
