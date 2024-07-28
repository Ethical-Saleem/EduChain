"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { passwordResetValidationSchema } from "@/app/utils/formValidations";
import CustomPasswordInput from "@/components/CustomPasswordInput";

import { AuthenticationService } from "@/app/services/AuthenticationService";
import { Demo } from "../../../../types";
import Link from "next/link";
import Image from "next/image";

const ForgorPassword = () => {
  const emptyData: Demo.ResetPassword = {
    email: "",
    code: "",
    newPassword: "",
    confirmPassword: "",
  };
  const [email, setEmail] = useState<string>("");
  const [resetPasswordData, setResetPasswordData] = useState(emptyData);
  const [activeViewIndex, setActiveViewIndex] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const [resendEnabled, setResendEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const toast = useRef<Toast>(null);

  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(passwordResetValidationSchema),
    defaultValues: resetPasswordData,
  });

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setResendEnabled(true);
    }
  }, [countdown]);

  const newPassword = watch("newPassword", "");

  const passwordCriteria = [
    {
      text: "At least 8 characters",
      regex: /^.{8,}$/,
    },
    {
      text: "At least one uppercase letter",
      regex: /[A-Z]/,
    },
    {
      text: "At least one lowercase letter",
      regex: /[a-z]/,
    },
    {
      text: "At least one number",
      regex: /[0-9]/,
    },
    {
      text: "At least one special character",
      regex: /[!@#$%^&*(),.?":{}|<>]/,
    },
  ];

  const dispatchSendResetCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await AuthenticationService.forgotPassword(email);
      if (res) {
        console.log("send-mail-res", res);
        setLoading(false);
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: res.message,
          life: 3000,
        });
        setResetPasswordData((prevData) => ({
          ...prevData,
          email: email,
        }));
        setActiveViewIndex(1);
        startCountdown();
      }
    } catch (error: any) {
      console.log("send-mail-error", error);
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
      setLoading(false);
    }
  };

  const dispatchResetPassword = async (data: Demo.ResetPassword) => {
    setLoading(true);
    try {
      const res = await AuthenticationService.resetPassword(data);
      if (res) {
        console.log("reset", res);
        setLoading(false);
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: res.message,
          life: 3000,
        });
        setResetPasswordData((prevData) => ({
          ...prevData,
          email: email,
        }));
        setActiveViewIndex(1);
        startCountdown();
      }
    } catch (error: any) {
      console.log("reset-error", error);
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
      setLoading(false);
    }
  };

  const onResetSubmit = (data: Demo.ResetPassword) => {
    dispatchResetPassword(data);
  };

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: string
  ) => {
    const val = (e.target && e.target.value) || "";
    let _data = { ...resetPasswordData };
    _data[`${name}`] = val;

    setResetPasswordData(_data);
  };

  const startCountdown = () => {
    setCountdown(90);
    setResendEnabled(false);
  };

  const renderCriteriaIcon = (isValid: boolean) => {
    return isValid ? (
      <i className="pi pi-check-circle text-green-500"></i>
    ) : (
      <i className="pi pi-times-circle text-red-500"></i>
    );
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden px-4 pb-6">
      <Toast ref={toast} />
      <div className="absolute inset-0 bg-uisky-200 flex items-center justify-center">
        <div
          className="for-bg bg-center bg-no-repeat bg-cover"
          style={{ width: "500px", height: "500px", opacity: 0.2 }}
        ></div>
      </div>
      <div className="mx-auto relative z-1 flex w-full max-w-6xl items-center justify-center px-4">
        <Image
          src="/educhain_1.png"
          className="mx-auto max-w-xl"
          alt="EduChain Logo"
          width={150}
          height={150}
        />
      </div>
      <div className="flex w-full z-1 relative items-center justify-center">
        <div className="relative mx-auto w-full max-w-2xl">
          <div className="me-auto ms-auto mt-2 w-full">
            <div className="me-auto ms-auto mt-4 w-full max-w-md">
              {activeViewIndex === 0 && (<div className="text-center">
                <h1 className="text-3xl text-uiyellow-900 font-bold">
                  Forgot your password?
                </h1>
                <p className="text-base mb-4 font-medium text-[#061a2b]">
                  An email containing instructions will be sent to your inbox
                </p>
              </div>)}
              {activeViewIndex === 1 && (
                <div className="text-center">
                <h1 className="text-2xl text-uiyellow-900 font-bold">
                  Recover Password
                </h1>
                <p className="text-base mb-3 font-medium text-[#061a2b]">
                  Create a new password
                </p>
              </div>
              )}
              {activeViewIndex === 0 && (
                <form className="px-4 py-4" onSubmit={dispatchSendResetCode}>
                  <div className="mb-4 space-y-4">
                    <div className="field w-full">
                      <label
                        htmlFor="email"
                        className="block text-900 text-base font-medium mb-2"
                      >
                        Email
                      </label>
                      <InputText
                        type="email"
                        className="w-full p-2 bg-gray-200 ring-1 ring-uisky-400"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-6">
                    <Button
                      label="Send Code"
                      type="submit"
                      loading={loading}
                      className="bg-[#245763] w-full text-white p-2 md:p-3 hover:bg-[#061a2b]"
                    />
                  </div>
                </form>
              )}
              {activeViewIndex === 1 && (
                // <div className="card flex p-2">
                  <form
                    onSubmit={handleSubmit(onResetSubmit)}
                    className="flex flex-column w-full align-items-center"
                  >
                    <div className="w-full md:overflow-y-auto md:max-h-[50vh]">
                      <div className="field w-full md:px-2">
                        <label
                          className="block text-900 text-sm md:text-base font-medium mb-2"
                          htmlFor="email"
                        >
                          Email
                        </label>
                        <Controller
                          name="email"
                          control={control}
                          render={({ field }) => (
                            <InputText
                              {...field}
                              id="email"
                              placeholder="Email Address"
                              className={`w-full px-2 py-1 bg-gray-100 ring-1 ring-uisky-400 ${
                                errors.email ? "p-invalid" : ""
                              }`}
                            />
                          )}
                        />
                        {errors.email && (
                          <small className="p-error">
                            {errors.email.message}
                          </small>
                        )}
                      </div>
                      <div className="field w-full md:px-2">
                        <label
                          className="block text-900 text-sm md:text-base font-medium mb-2"
                          htmlFor="code"
                        >
                          Code
                        </label>
                        <Controller
                          name="code"
                          control={control}
                          render={({ field }) => (
                            <InputText
                              {...field}
                              id="code"
                              placeholder="Enter Code"
                              className={`w-full px-2 py-1 bg-gray-100 ring-1 ring-uisky-400 ${
                                errors.code ? "p-invalid" : ""
                              }`}
                            />
                          )}
                        />
                        {errors.code && (
                          <small className="p-error">
                            {errors.code.message}
                          </small>
                        )}
                      </div>
                      <div className="field w-full md:px-2">
                        <label
                          className="block text-900 text-sm md:text-base font-medium mb-2"
                          htmlFor="newPassword"
                        >
                          New Password
                        </label>
                        <Controller
                          name="newPassword"
                          control={control}
                          render={({ field }) => (
                            <CustomPasswordInput
                              {...field}
                              placeholder="Enter your new password"
                              className={`w-full px-2 py-1 bg-gray-100 ring-1 ring-uisky-400 ${
                                errors.newPassword ? "p-invalid" : ""
                              }`}
                            />
                          )}
                        />
                        <ul className="list-none p-0 m-0 mt-2">
                          {passwordCriteria.map((criteria, index) => (
                            <li
                              key={index}
                              className="flex items-center gap-2 text-sm"
                            >
                              {renderCriteriaIcon(
                                criteria.regex.test(newPassword)
                              )}
                              <span>{criteria.text}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="field w-full md:px-2">
                        <label
                          className="block text-900 text-sm md:text-base font-medium mb-2"
                          htmlFor="confirmPassword"
                        >
                          Confirm Password
                        </label>
                        <Controller
                          name="confirmPassword"
                          control={control}
                          render={({ field }) => (
                            <CustomPasswordInput
                              {...field}
                              placeholder="Enter your password again"
                              className={`w-full px-2 py-1 bg-gray-100 ring-1 ring-uisky-400 ${
                                errors.confirmPassword ? "p-invalid" : ""
                              }`}
                            />
                          )}
                        />
                        {errors.confirmPassword && (
                          <small className="p-error">
                            {errors.confirmPassword.message}
                          </small>
                        )}
                      </div>
                    </div>
                    <div className="w-full text-center mt-2">
                      <Button
                        label="Continue"
                        className="w-full bg-[#245763] text-white mb-2 p-2 md:p-2 hover:bg-[#061a2b]"
                        loading={loading}
                        type="submit"
                      ></Button>
                      <div className="flex items-center justify-center">
                        <p className="text-sm flex items-center">
                          Didn&apos;t receive a code?{" "}
                          <Button
                            label="Resend"
                            disabled={!resendEnabled}
                            text
                            onClick={dispatchSendResetCode}
                            loading={loading}
                            className="text-semibold underline text-[#245763]"
                          />
                        </p>
                        {!resendEnabled && (
                          <span className="text-uiyellow-700 font-medium text-sm md:text-base ml-1 md:ml-3">
                            {Math.floor(countdown / 60)}:
                            {(countdown % 60).toString().padStart(2, "0")}
                          </span>
                        )}
                      </div>
                      <p className="text-sm block md:hidden mt-2">
                        Return to{" "}
                        <Link
                          href="/"
                          className="text-base text-[#061a2b] font-semibold"
                        >
                          Login
                        </Link>
                      </p>
                    </div>
                  </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgorPassword;
