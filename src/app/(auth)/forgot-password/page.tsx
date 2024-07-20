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
// import { watch } from "fs";

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
    <div className="min-h-screen w-screen flex justify-center items-center bg-gray-100">
      <Toast ref={toast} />
      <div className="overlay-container hidden md:flex md:w-1/2 bg-gradient-to-r from-[#5a5a95] to-[#245763] text-white p-8 items-center justify-center flex-col">
        <div className="overlay-panel text-center">
          <h1 className="text-2xl font-bold mb-4">
            Forgot your <span className="text-white">Password?</span>
          </h1>
          {activeViewIndex === 0 && (
            <p className="text-sm mb-8">
              Please provide the email associated with your account.
            </p>
          )}
          {activeViewIndex === 1 && (
            <p className="text-sm mb-8">
              Provide the code sent to your mailbox to reset your password.
            </p>
          )}
          <p className="text-sm hidden md:block">Return to <Link href="/login" className="text-base text-[#061a2b] font-semibold">Login</Link></p>
        </div>
      </div>
      <div className="container bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-lg flex flex-col md:flex-row">
        <div className="form-container sign-in-container py-6 px-4 p-md-6 w-full">
          {activeViewIndex === 0 && (
            <>
              <div className="mb-3">
                <Button
                  label="Back"
                  icon="pi pi-arrow-left"
                  link
                  onClick={() => router.push("/login")}
                  className="text-xl"
                ></Button>
              </div>
              <form
                className="flex flex-col items-center"
                onSubmit={dispatchSendResetCode}
              >
                {/* <Image
                  src="/educhain-chrome-two.png"
                  alt="Logo"
                  width={120}
                  height={100}
                /> */}
                <h1
                  className="text-xl md:text-2xl font-bold mb-4"
                  style={{ color: "#245763" }}
                >
                  Forgot Password
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
                <p className="text-color-secondary text-sm md:text-base block md:hidden mb-5">
                  Please confirm the email associated with your account
                </p>
                <div className="field w-full">
                  <label
                    htmlFor="email"
                    className="block text-900 text-base font-medium mb-2"
                  >
                    Email
                  </label>
                  <InputText
                    type="email"
                    className="w-full mb-4 p-2 bg-gray-200"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="w-full text-right">
                  <Button
                    label="Send Code"
                    type="submit"
                    loading={loading}
                    className="bg-[#245763] text-white p-2 md:p-3 hover:bg-[#061a2b]"
                  />
                </div>
              </form>
            </>
          )}
          {activeViewIndex === 1 && (
            <div className="card flex p-2">
              <form
                onSubmit={handleSubmit(onResetSubmit)}
                className="flex flex-column w-full align-items-center"
              >
                <p className="font-bold md:text-xl mb-2 md:mb-5">
                  Reset Your Password
                </p>
                <p className="text-color-secondary text-sm md:text-base block md:hidden mb-5">
                  Please enter the code sent to your mail.
                </p>
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
                          className={`w-full mb-2 p-2 bg-gray-100 ${
                            errors.email ? "p-invalid" : ""
                          }`}
                        />
                      )}
                    />
                    {errors.email && (
                      <small className="p-error">{errors.email.message}</small>
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
                          className={`w-full mb-2 p-2 bg-gray-100 ${
                            errors.code ? "p-invalid" : ""
                          }`}
                        />
                      )}
                    />
                    {errors.code && (
                      <small className="p-error">{errors.code.message}</small>
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
                          className={`w-full mb-2 p-2 bg-gray-100 ${
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
                          {renderCriteriaIcon(criteria.regex.test(newPassword))}
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
                          className={`w-full mb-2 p-2 bg-gray-100 ${
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
                  <p className="text-sm">Didn&apos;t receive a code? <Button label="Resend" disabled={!resendEnabled} text onClick={dispatchSendResetCode} loading={loading} className="text-semibold underline text-[#245763]" /></p>
                  {!resendEnabled && (
                      <span className="text-[#5a5a9b] text-sm md:text-base ml-1 md:ml-3">
                        {Math.floor(countdown / 60)}:
                        {(countdown % 60).toString().padStart(2, "0")}
                      </span>
                    )}
                  </div>
                  <p className="text-sm block md:hidden mt-2">Return to <Link href="/" className="text-base text-[#061a2b] font-semibold">Login</Link></p>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgorPassword;
