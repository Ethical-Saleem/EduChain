"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AuthenticationService } from "../services/AuthenticationService";

type ComponentType = React.ComponentType<any>;

export function withAuth(Component: ComponentType) {
  const WithAuth: React.FC<any> = (props) => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathName = usePathname();
    const { currentUserValue } = AuthenticationService;
    const [message, setMessage] = useState<string | null>(
      "You have been redirected to this page because you are trying to access an authenticated page. Kindly Login to continue"
    );

    useEffect(() => {
      const checkAuth = async () => {
        if (!currentUserValue) {
          if (!currentUserValue) {
            const returnUrl = pathName;
            const redirectMessage = message;
            router.replace(
              `/login?redirect=${encodeURIComponent(
                returnUrl
              )}&message=${redirectMessage}`
            );
          } else {
            setLoading(false);
            setMessage(null);
          }
        } else {
          setLoading(false);
        }
      };

      checkAuth();
    }, [currentUserValue]);

    console.log("current-path", pathName);

    // if (!currentUserValue) {
    //     router.push('/login')
    //     return null;
    // }
    if (loading) {
      return <div>Loading...</div>;
    }

    return <Component {...props} />;
  };

  return WithAuth;
}
