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
import { lusitana } from "@/app/ui/fonts";
import Image from "next/image";

import { AuthenticationService } from "@/app/services/AuthenticationService";
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
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: error.response.data.message,
        life: 3000,
      });
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
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: error.response.data.message,
        life: 3000,
      });
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
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: error.response.data.message,
        life: 3000,
      });
      setLoading(false);
    }
  };

  const startCountdown = () => {
    setCountdown(90);
    setResendEnabled(false);
  };

  const customInput: FunctionComponent<CustomInputProps> = ({
    events,
    props,
  }) => {
    const { key, ...restProps } = props;
    return (
      <>
        <input
          key={key}
          {...events}
          {...restProps}
          type="text"
          className="custom-otp-input-sample"
        />
        {props?.id === 2 && (
          <div className="px-3">
            <i className="pi pi-minus" />
          </div>
        )}
      </>
    );
  };

  return (
    <div className="min-h-screen w-screen flex justify-center items-center bg-gray-100">
      <Toast ref={toast} />
      <div className="overlay-container hidden md:flex md:w-1/2 bg-gradient-to-r from-[#5a5a95] to-[#245763] text-white p-8 items-center justify-center flex-col">
        <div className="overlay-panel text-center">
          <h1 className="text-2xl font-bold mb-4">
            Verify your <span className="text-white">Account</span>
          </h1>
          {activeViewIndex === 0 && (
            <p className="text-sm mb-8">
              Please confirm the email associated with your account.
            </p>
          )}
          {activeViewIndex === 1 && (
            <p className="text-sm mb-8">
              Provide the code sent to your mailbox to verify your account.
            </p>
          )}
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
                onSubmit={dispatchSendVerification}
                className="flex flex-col items-center"
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
                  Verify Your Account
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
            <div className="card flex justify-content-center">
              <style scoped>
                {`
                    .custom-otp-input-sample {
                        width: 48px;
                        height: 48px;
                        font-size: 24px;
                        appearance: none;
                        text-align: center;
                        transition: all 0.2s;
                        border-radius: 0;
                        border: 1px solid var(--surface-400);
                        background: transparent;
                        outline-offset: -2px;
                        outline-color: transparent;
                        border-right: 0 none;
                        transition: outline-color 0.3s;
                        color: var(--text-color);
                    }

                    .custom-otp-input-sample:focus {
                        outline: 2px solid var(--primary-color);
                    }

                    .custom-otp-input-sample:first-child,
                    .custom-otp-input-sample:nth-child(5) {
                        border-top-left-radius: 12px;
                        border-bottom-left-radius: 12px;
                    }

                    .custom-otp-input-sample:nth-child(3),
                    .custom-otp-input-sample:last-child {
                        border-top-right-radius: 12px;
                        border-bottom-right-radius: 12px;
                        border-right-width: 1px;
                        border-right-style: solid;
                        border-color: var(--surface-400);
                    }

                    @media (max-width: 768px) {
                      .custom-otp-input-sample {
                        width: 36px;
                        height: 36px;
                        font-size: 20px;
                      }

                      .text-xl {
                        font-size: 1.25rem;
                      }

                      .p-3 {
                        padding: 0.75rem;
                      }
                    }
                `}
              </style>
              <div className="flex flex-column align-items-center">
                <p className="font-bold md:text-xl mb-2 md:mb-5">
                  Authenticate Your Account
                </p>
                <p className="text-color-secondary text-sm md:text-base block md:hidden mb-5">
                  Please enter the code sent to your mail.
                </p>
                <InputOtp
                  value={token}
                  onChange={(e) => setToken(e.value?.toString().toUpperCase())}
                  length={6}
                  inputTemplate={customInput}
                  style={{ gap: 0 }}
                />
                <div className="flex justify-content-between mt-5 align-self-stretch">
                  <div className="flex items-center">
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
                      <span className="text-[#061a2b] text-sm md:text-base ml-1 md:ml-3">
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;
