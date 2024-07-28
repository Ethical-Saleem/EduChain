"use client";

import React, {
  useState,
  useEffect,
  useRef,
  FunctionComponent,
  InputHTMLAttributes,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputOtp } from "primereact/inputotp";
import Image from "next/image";

import { AuthenticationService } from "../../services/AuthenticationService";
import { Demo } from "../../../../types";

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  events: {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  props: any;
}

const VerificationPage = () => {
  const [email, setEmail] = useState<string>("");
  const [token, setToken] = useState<string | null | undefined>();
  const [activeViewIndex, setActiveViewIndex] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const [resendEnabled, setResendEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const toast = useRef<Toast>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (activeViewIndex === 1) {
        e.preventDefault();
      }
    };

    const emailParam = searchParams.get("e");
    if (emailParam) {
      setEmail(emailParam);
    }

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [activeViewIndex, searchParams]);

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

  const dispatchSendVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await AuthenticationService.sendVerificationMail(email);
      if (res) {
        console.log("send-mail-res", res);
        setLoading(false);
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: res.message,
          life: 3000,
        });
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

  const dispatchResendVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setResending(true);
    try {
      const res = await AuthenticationService.sendVerificationMail(email);
      if (res) {
        console.log("send-mail-res", res);
        setResending(false);
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: res.message,
          life: 3000,
        });
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
      setResending(false);
    }
  };

  const dispatchVerifyEmail = async () => {
    setLoading(true);
    try {
      const res = await AuthenticationService.verifyEmail(email, token);
      if (res) {
        setLoading(false);
        console.log("email-verify-res", res);
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: "Email verification successful",
          life: 3000,
        });
        router.push("/login");
      }
    } catch (error: any) {
      console.log("verify-email-error", error);
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

  const startCountdown = () => {
    setCountdown(90);
    setResendEnabled(false);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden px-4">
      <Toast ref={toast} />
      <div className="absolute inset-0 bg-uisky-200 flex items-center justify-center">
        <div
          className="for-bg bg-center bg-no-repeat bg-cover"
          style={{width: "500px", height: "500px", opacity: 0.2}}
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
          <div className="me-auto ms-auto mt-4 w-full">
            <div className="me-auto ms-auto mt-4 w-full max-w-md">
              <div className="text-center">
                <h1 className="text-3xl text-uiyellow-900 font-bold">
                  Verify your Account
                </h1>
                <p className="text-base mb-4 font-medium text-[#061a2b]">
                  An email containing instructions will be sent to your inbox
                </p>
              </div>
              {activeViewIndex === 0 && (
                <form onSubmit={dispatchSendVerification} className="px-4 py-4">
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
                      className="bg-[#245763] text-white p-2 md:p-3 w-full hover:bg-[#061a2b]"
                    />
                  </div>
                </form>
              )}
              {activeViewIndex === 1 && (
                <div className="flex flex-column align-items-center">
                  <p className="font-bold md:text-xl mb-2 md:mb-5">
                    Authenticate Your Account
                  </p>
                  <p className="text-color-secondary text-sm md:text-base block md:hidden mb-5">
                    Please enter the code sent to your mail.
                  </p>
                  <InputOtp
                    value={token}
                    onChange={(e) =>
                      setToken(e.value?.toString().toUpperCase())
                    }
                    length={6}
                    className="custom-otp-input-sample"
                    style={{ gap: 1 }}
                  />
                  <div className="flex justify-content-between mt-5 align-self-stretch">
                    <div className="flex items-center px-2">
                      <Button
                        label="Resend Code"
                        icon="pi pi-refresh"
                        link
                        onClick={dispatchResendVerification}
                        loading={resending}
                        disabled={!resendEnabled}
                        className="text-[#245763] text-sm md:text-lg p-0 hover:bg-white"
                      />
                      {!resendEnabled && (
                        <span className="text-uiyellow-700 font-medium text-sm md:text-base ml-1 md:ml-3">
                          {Math.floor(countdown / 60)}:
                          {(countdown % 60).toString().padStart(2, "0")}
                        </span>
                      )}
                    </div>
                    <Button
                      label="Validate"
                      onClick={dispatchVerifyEmail}
                      loading={loading}
                      className="bg-[#245763] text-white text-sm md:text-lg p-2 md:p-3 hover:bg-[#061a2b]"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;
