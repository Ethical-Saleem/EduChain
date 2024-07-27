import AppMenu from "./AppMenu";
import React, { useEffect, useState } from "react";
import { AuthenticationService } from "@/app/services/AuthenticationService";
import { Demo } from "../types";
import Image from "next/image";
import DefaultLogo from "@/app/ui/default-logo";

const AppSidebar = () => {
  const [currentUser, setCurrentUser] = useState<Demo.TokenModel | null>(null);

  useEffect(() => {
    const user = AuthenticationService.currentUserValue;
    setCurrentUser(user);
    console.log("user", user);
  }, [currentUser]);
  return (
    <>
      <div className="p-2">
      {currentUser?.school?.logoUrl ? (
          <Image
            src={currentUser?.school?.logoUrl}
            width={60}
            height={60}
            className="block md:hidden mr-2"
            alt="Sch. Logo"
          />
        ) : (
          <DefaultLogo />
        )}
      </div>
      <AppMenu />
    </>
  );
};

export default AppSidebar;
