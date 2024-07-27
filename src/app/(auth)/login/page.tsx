/* eslint-disable @next/next/no-img-element */
"use client";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { Toast } from "primereact/toast";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { InputText } from "primereact/inputtext";
import { lusitana } from "../../ui/fonts";
import Image from "next/image";

import { AuthenticationService } from "../../services/AuthenticationService";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const toast = useRef<Toast>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const messageParam = searchParams.get("message");
    if (messageParam) {
      setMessage(messageParam);
      toast.current?.show({
        severity: "warn",
        summary: "Authentication Warning",
        detail: messageParam,
        life: 3000,
      });
      console.log("redirect-message", messageParam);
    }
  }, [searchParams]);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await AuthenticationService.login(email, password);
      const redirectUrl = searchParams.get("redirect");
      if (res) {
        console.log("res", res);
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: "Login successful",
          life: 3000,
        });
        setLoading(false);
        if (redirectUrl) {
          router.push(redirectUrl);
        }
        if (!res.hasVerifiedEmail) {
          router.replace(`/email-verification?e=${email}`);
        } else {
          router.push("/dashboard");
        }
      }
    } catch (error: any) {
      setLoading(false);
      console.log("login-error", error);
      if (error.response) {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: error.response.data.message,
          life: 3000,
        });
      } else if (error.message) {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: error.message,
          life: 3000,
        });
      } else {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: error,
          life: 3000,
        });
      }
    }
  };

  return (
    <div className="flex h-screen w-full flex-col md:flex-row items-center bg-gray-100">
      <Toast ref={toast} />
      <div className="bg-uimuted-500 dark:bg-muted-900 hidden h-screen w-full md:w-1/2 lg:block xl:w-2/3">
        <div className="mx-auto flex size-full max-w-4xl items-center justify-center">
          <Image src="/educhain_1.png" className="mx-auto max-w-xl" alt="EduChain Logo" width={400} height={400} />
        </div>
      </div>
      <div className="bg-uiyellow-50 flex h-screen w-full items-center justify-center px-6 md:mx-auto md:w-1/2 md:max-w-sm lg:max-w-full lg:px-16 xl:w-1/3 xl:px-12">
        <div className="mx-auto flex size-full max-w-sm flex-col items-center justify-between py-[2rem]">
          <Image
            src="/educhain_1.png"
            className="mx-auto max-w-xl"
            alt="EduChain Logo"
            width={120}
            height={120}
          />
          <div className="w-full">
            <h1 className="text-2xl text-uiyellow-900 font-semibold">
              Welcome
            </h1>
            <p className="text-base mb-4 font-normal text-[#061a2b]">
              Enter your credentials to sign in
            </p>
            <form onSubmit={login} className="flex flex-col items-center">
              <div className="space-y-4 w-full">
                <InputText
                  type="email"
                  placeholder="Email"
                  className="w-full mb-3 p-2 bg-uiyellow-100 ring-1 ring-uisky-400"
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
                  inputClassName="w-full p-2 bg-uiyellow-100 ring-1 ring-uisky-400"
                  className="w-full mb-3 bg-uiyellow-200"
                />
              </div>
              <div className="w-full text-right">
                <Link
                  href="/forgot-password"
                  className="text-sm font-bold text-[#5a5a95] hover:text-[#061a2b]"
                >
                  Forgot your password?
                </Link>
              </div>
              <div className="mt-2 w-full">
                <div className="block w-full rounded-md shadow-sm">
                  <Button
                    label="Sign In"
                    type="submit"
                    loading={loading}
                    className="w-full bg-uiyellow-800 text-white px-3 py-2 hover:bg-[#061a2b]"
                  />
                </div>
              </div>
            </form>
            <div className="text-center mt-3">
              <p
                className={`${lusitana.className} text-sm md:text-sm text-[#061a2b]`}
              >
                New to the platform?{" "}
                <Link href="/register">
                  <strong className="text-[#5a5a95] font-semibold">Register your school.</strong>
                </Link>
              </p>
            </div>
          </div>
          <div className="text-center">
            <span>2024. All Rights Reserved</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
