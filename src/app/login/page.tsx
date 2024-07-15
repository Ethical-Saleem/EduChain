/* eslint-disable @next/next/no-img-element */
"use client";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import React, { useContext, useState, useRef, useEffect } from "react";
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
  const [message, setMessage] = useState("");
  const toast = useRef<Toast>(null);
  const { layoutConfig } = useContext(LayoutContext);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const messageParam = searchParams.get("message");
    if (messageParam) {
      setMessage(messageParam);
    }
  }, [searchParams])

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
    <div className="min-h-screen w-screen flex justify-center items-center bg-gray-100">
      <Toast ref={toast} />
      <div className="overlay-container hidden md:flex md:w-1/2 bg-gradient-to-r from-[#5a5a95] to-[#245763] text-white p-8 items-center justify-center flex-col">
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
          <form onSubmit={login} className="flex flex-col items-center">
            <h1
              className="text-2xl font-bold mb-4"
              style={{ color: "#245763" }}
            >
              Sign in
            </h1>
            <div className="social-container flex space-x-4 mb-4">
              <a
                href="#"
                className="social bg-gray-200 rounded-full p-2 text-[#5a5a95]"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="#"
                className="social bg-gray-200 rounded-full p-2 text-[#5a5a95]"
              >
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a
                href="#"
                className="social bg-gray-200 rounded-full p-2 text-[#5a5a95]"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <span className="text-sm mb-4 text-[#061a2b]">
              or use your account
            </span>
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
            <a
              href="#"
              className="text-sm mb-4 text-[#5a5a95] hover:text-[#061a2b]"
            >
              Forgot your password?
            </a>
            <Button
              label="Sign In"
              type="submit"
              loading={loading}
              className="w-full bg-[#245763] text-white p-3 hover:bg-[#061a2b]"
            />
          </form>
          <div className="text-center mt-2">
            <p className={`${lusitana.className} text-lg text-[#061a2b]`}>
              New to the platform? Kindly{" "}
              <Link href="/register">
                <strong className="text-[#5a5a95]">register</strong>
              </Link>{" "}
              your school.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
