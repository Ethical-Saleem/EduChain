/* eslint-disable @next/next/no-img-element */
"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { useContext, useState, useRef } from "react";
import { Toast } from "primereact/toast";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { LayoutContext } from "../../../layout/context/layoutcontext";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { lusitana } from "../ui/fonts";

import { AuthenticationService } from "../services/AuthenticationService";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useRef<Toast>(null);
  const { layoutConfig } = useContext(LayoutContext);

  const router = useRouter();
  const containerClassName = classNames(
    "surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden",
    { "p-input-filled": layoutConfig.inputStyle === "filled" }
  );

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await AuthenticationService.login(email, password);
      if (res) {
        console.log("res", res);
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: "Login successful",
          life: 3000,
        });
        setLoading(false);
        router.push("/dashboard");
      }
    } catch (error: any) {
      setLoading(false);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: error,
        life: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen w-screen flex justify-center items-center bg-blue-100">
      <Toast ref={toast} />
      <div className="overlay-container hidden md:flex md:w-1/2 bg-gradient-to-r from-pink-500 to-red-500 text-white p-8 items-center justify-center flex-col">
        <div className="overlay-panel text-center">
          <h1 className="text-2xl font-bold mb-4">
            Welcome to <span className="text-white">EduChain</span>
          </h1>
          <p className="text-sm mb-8">
            Enter your login credentials to access the platform
          </p>
        </div>
      </div>
      <div className="container bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-lg flex flex-col md:flex-row">
        <div className="form-container sign-in-container py-8 px-4 p-md-8 w-full">
          <form className="flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-4">Sign in</h1>
            <div className="social-container flex space-x-4 mb-4">
              <a href="#" className="social bg-gray-200 rounded-full p-2">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social bg-gray-200 rounded-full p-2">
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a href="#" className="social bg-gray-200 rounded-full p-2">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <span className="text-sm mb-4">or use your account</span>
            <InputText
              type="email"
              placeholder="Email"
              className="w-full mb-4 p-2 bg-gray-200"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              toggleMask
              required
              placeholder="Password"
              inputClassName="w-full p-2 bg-gray-200"
              className="w-full mb-4 bg-gray-200"
            />
            <a href="#" className="text-sm mb-4">
              Forgot your password?
            </a>
            <Button
              label="Sign In"
              type="submit"
              loading={loading}
              className="w-full bg-red-500 text-white p-3"
            />
          </form>
          <div className="text-center mt-2">
            <p className={`${lusitana.className} text-lg`}>
              New to the platform? Kindly{" "}
              <Link href="/register">
                <strong>register</strong>
              </Link>{" "}
              your school.
            </p>
          </div>
        </div>
      </div>
    </div>
    // <div className={containerClassName}>
    //   <div className="flex flex-column align-items-center justify-content-center">
    //     <img
    //       src={`/layout/images/logo-${
    //         layoutConfig.colorScheme === "light" ? "dark" : "white"
    //       }.svg`}
    //       alt="Edu logo"
    //       className="mb-5 w-6rem flex-shrink-0"
    //     />
    //     <div
    //       style={{
    //         borderRadius: "56px",
    //         padding: "0.3rem",
    //         background:
    //           "linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)",
    //       }}
    //     >
    //       <div
    //         className="w-full surface-card py-8 px-5 sm:px-8"
    //         style={{ borderRadius: "53px" }}
    //       >
    //         <div className="text-center mb-5">
    //           <img
    //             src="/demo/images/login/avatar.png"
    //             alt="Image"
    //             height="50"
    //             className="mb-3"
    //           />
    //           <div className="text-900 text-3xl font-medium mb-3">Welcome</div>
    //           <span className="text-600 font-medium">Sign in to continue</span>
    //         </div>

    //         <form onSubmit={login}>
    //           <label
    //             htmlFor="email1"
    //             className="block text-900 text-xl font-medium mb-2"
    //           >
    //             Email
    //           </label>
    //           <InputText
    //             id="email1"
    //             type="text"
    //             placeholder="Email address"
    //             className="w-full md:w-30rem mb-5"
    //             style={{ padding: "1rem" }}
    //             value={email}
    //             required
    //             onChange={(e) => setEmail(e.target.value)}
    //           />

    //           <label
    //             htmlFor="password1"
    //             className="block text-900 font-medium text-xl mb-2"
    //           >
    //             Password
    //           </label>
    //           <Password
    //             inputId="password1"
    //             value={password}
    //             onChange={(e) => setPassword(e.target.value)}
    //             placeholder="Password"
    //             toggleMask
    //             required
    //             className="w-full mb-5"
    //             inputClassName="w-full p-3 md:w-30rem"
    //           ></Password>

    //           <div className="flex align-items-center justify-content-between mb-5 gap-5">
    //             <div className="flex align-items-center">
    //               <Checkbox
    //                 inputId="rememberme1"
    //                 checked={checked}
    //                 onChange={(e) => setChecked(e.checked ?? false)}
    //                 className="mr-2"
    //               ></Checkbox>
    //               <label htmlFor="rememberme1">Remember me</label>
    //             </div>
    //             <a
    //               className="font-medium no-underline ml-2 text-right cursor-pointer"
    //               style={{ color: "var(--primary-color)" }}
    //             >
    //               Forgot password?
    //             </a>
    //           </div>
    //           <Button
    //             label="Sign In"
    //             loading={loading}
    //             className="w-full p-3 text-xl"
    //             type="submit"
    //           ></Button>
    //           <Toast ref={toast} />
    //         </form>
    //         <div className="mt-3 text-center">
    //           <p className={`${lusitana.className} text-lg`}>
    //             New to the platform? Kindly{" "}
    //             <Link href="/register">
    //               <strong>register</strong>
    //             </Link>{" "}
    //             your school.
    //           </p>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default LoginPage;
