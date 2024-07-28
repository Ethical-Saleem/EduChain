/* eslint-disable @next/next/no-img-element */
"use client";
import { useRouter } from "next/navigation";
import React, {
  useContext,
  useState,
  useRef,
  Dispatch,
  SetStateAction,
} from "react";
import Link from "next/link";
import Image from "next/image";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { LayoutContext } from "../../../../layout/context/layoutcontext";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { FileUpload } from "primereact/fileupload";
import { classNames } from "primereact/utils";
import { Demo } from "../../../../types";
import { lusitana } from "../../ui/fonts";

import { AuthenticationService } from "../../services/AuthenticationService";
import { InputTextarea } from "primereact/inputtextarea";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomPasswordInput from "@/components/CustomPasswordInput";
import { createUserValidationSchemaOmit } from "@/app/utils/formValidations";

interface SchoolFormProps {
  setCreated: Dispatch<SetStateAction<boolean>>;
  setNewUserData: Dispatch<SetStateAction<Demo.NewUser>>;
}

const UserForm = ({ newUserData }: any) => {
  const emptyUserData: Demo.NewUser = {
    name: "",
    email: "",
    telephone: "",
    password: "",
    schoolId: 0,
    isNewSuper: true,
  };
  const [loading, setLoading] = useState(false);
  const toast = useRef<Toast>(null);

  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(createUserValidationSchemaOmit),
    defaultValues: newUserData,
  });

  const createUser = async (data: Demo.NewUser) => {
    setLoading(true);
    try {
      const res = await AuthenticationService.registerUser(data);
      console.log(res);
      if (res) {
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: "User creation successful",
          life: 3000,
        });

        router.replace(`/email-verification?e=${data.email}`);
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
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

  const onUserSubmit = (data: Demo.NewUser) => {
    createUser(data);
  };

  const password = watch("password", "");

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

  const renderCriteriaIcon = (isValid: boolean) => {
    return isValid ? (
      <i className="pi pi-check-circle text-green-500"></i>
    ) : (
      <i className="pi pi-times-circle text-red-500"></i>
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit(onUserSubmit)} className="mx-auto w-full max-w-xs">
        <h1 className="text-2xl text-uiyellow-900 font-semibold">Next Step</h1>
        <p className="text-base mb-4 font-normal text-[#061a2b]">
          Create an Admin user to login into your dashboard
        </p>
        <div className="flex flex-col mb-2 space-y-2">
        <div className="formgrid grid form-inputs md:overflow-y-auto md:max-h-[50vh] mb-2">
          <div className="field col-12">
            <label
              htmlFor="name"
              className="block text-900 text-base font-medium mb-2"
            >
              Username
              <span className="ml-1 text-rose-400">*</span>
            </label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <InputText
                  {...field}
                  id="name"
                  placeholder="Username"
                  className={`w-full bg-gray-100 px-2 py-1 ring-1 ring-uisky-400 ${
                    errors.name ? "p-invalid" : ""
                  }`}
                />
              )}
            />
          </div>
          <div className="field col-12">
            <label
              htmlFor="email"
              className="block text-900 text-basebase font-medium mb-2"
            >
              Email
              <span className="ml-1 text-rose-400">*</span>
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
          </div>
          <div className="field col-12">
            <label
              htmlFor="telephone"
              className="block text-900 text-basebase font-medium mb-2"
            >
              Telephone
              <span className="ml-1 text-rose-400">*</span>
            </label>
            <Controller
              name="telephone"
              control={control}
              render={({ field }) => (
                <InputText
                  {...field}
                  id="telephone"
                  placeholder="Telephone"
                  className={`w-full px-2 py-1 bg-gray-100 ring-1 ring-uisky-400 ${
                    errors.telephone ? "p-invalid" : ""
                  }`}
                />
              )}
            />
          </div>
          <div className="field col-12">
            <label
              htmlFor="password"
              className="block text-900 font-medium text-basebase mb-2"
            >
              Default Password
              <span className="ml-1 text-rose-400">*</span>
            </label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <CustomPasswordInput
                  {...field}
                  placeholder="Enter your new password"
                  className={`w-full px-2 py-1 bg-gray-100 ring-1 ring-uisky-400 ${
                    errors.password ? "p-invalid" : ""
                  }`}
                />
              )}
            />
            <ul className="list-none p-0 m-0 mt-2">
              {passwordCriteria.map((criteria, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  {renderCriteriaIcon(criteria.regex.test(password))}
                  <span>{criteria.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        </div>
        <div className="text-center">
          <Button
            label="Continue"
            className="w-full bg-[#245763] text-white p-2 md:p-3 hover:bg-[#061a2b]"
            loading={loading}
            type="submit"
          ></Button>
        </div>
      </form>
    </>
  );
};

const RegisterPage = () => {
  const emptyUserData: Demo.NewUser = {
    name: "",
    email: "",
    telephone: "",
    password: "",
    schoolId: 0,
    isNewSuper: true,
  };
  const emptyData: Demo.NewSchool = {
    name: "",
    address: "",
    city: "",
    region: "",
    postalCode: "",
    contactName: "",
    country: "",
    email: "",
    telephone: "",
    dateFounded: null,
    logoUrl: null,
  };
  const [registerData, setRegisterData] = useState<Demo.NewSchool>(emptyData);
  const [loading, setLoading] = useState(false);
  const [newUserData, setNewUserData] = useState<Demo.NewUser>(emptyUserData);
  const [activeViewIndex, setActiveViewIndex] = useState(0);
  const toast = useRef<Toast>(null);

  const [testFile, setTestFile] = useState(null);

  const router = useRouter();

  const onDateChange = (e: { value: Date | null | undefined }) => {
    setRegisterData((prevData) => ({
      ...prevData,
      dateFounded: e.value,
    }));
  };

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: string
  ) => {
    const val = (e.target && e.target.value) || "";
    let _data = { ...registerData };
    _data[`${name}`] = val;

    setRegisterData(_data);
  };

  const handleFile = (event: any) => {
    setRegisterData((prevData) => ({
      ...prevData,
      logoUrl: event.target.files[0],
    }));
    const file = event.target.files[0];
    console.log("fileInput", file);
  };

  const register = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("register-data", registerData);
    setLoading(true);
    try {
      const res = await AuthenticationService.register(registerData);
      console.log("school-create-res", res);
      if (res) {
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: "School registration successful",
          life: 3000,
        });

        setNewUserData((prevData) => ({
          ...prevData,
          email: registerData.email,
          telephone: registerData.telephone,
          schoolId: res.id as number,
        }));

        setActiveViewIndex(1);
        // router.push('/login');
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
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
    <div className="h-screen md:flex">
      <Toast ref={toast} />
      <div className="from-uicream-900 to-uicream-500 i group relative hidden w-1/2 items-center justify-around overflow-hidden bg-gradient-to-tr md:flex">
        <div className="mx-auto max-w-xs text-center">
        <Image
          src="/educhain_1.png"
          className="mx-auto max-w-xl"
          alt="EduChain Logo"
          width={180}
          height={180}
        />
          <h2 className="text-3xl font-medium lead-normal text-white">
            Have an Account?
          </h2>
          <p className="text-uisky-200 font-normal lead-normal mb-4">
            No need to waste time on this page. Let&apos;s take you back to your
            account.
          </p>
          <Link
            href="/"
            className="ring-1 ring-uiyellow-800 text-white bg-uimuted-700 p-3 rounded-lg w-full"
          >
            Login to your account
          </Link>
        </div>
        <div className="bg-uimuted-200/20 absolute -start-6 -top-6 h-14 w-0 origin-top-left rotate-45 rounded-full transition-all delay-[25ms] duration-300 group-hover:w-72"></div>
        <div className="bg-uimuted-200/20 absolute -top-12 start-20 h-14 w-0 origin-top-left rotate-45 rounded-full transition-all delay-75 duration-300 group-hover:w-48"></div>
        <div className="bg-uimuted-200/20 absolute -start-7 top-24 h-14 w-0 origin-top-left rotate-45 rounded-full transition-all delay-150 duration-300 group-hover:w-40"></div>
        <div className="bg-uimuted-200/20 absolute -bottom-6 -end-6 h-14 w-0 origin-bottom-right rotate-45 rounded-full transition-all delay-150 duration-300 group-hover:w-72"></div>
        <div className="bg-uimuted-200/20 absolute -bottom-12 end-20 h-14 w-0 origin-bottom-right rotate-45 rounded-full transition-all delay-75 duration-300 group-hover:w-48"></div>
        <div className="bg-uimuted-200/20 absolute -end-7 bottom-24 h-14 w-0 origin-bottom-right rotate-45 rounded-full transition-all delay-[25ms] duration-300 group-hover:w-40"></div>
      </div>
      <div className="bg-uicream-100 flex flex-col items-center justify-between pt-2 py-10 md:w-1/2">
        <Image
          src="/educhain_1.png"
          className="mx-auto max-w-xl block md:hidden"
          alt="EduChain Logo"
          width={120}
          height={120}
        />
        <div className="mb-4"></div>
        {activeViewIndex === 0 && (
          <form onSubmit={register} className="mx-auto w-full max-w-xs">
            <>
              <h1 className="text-2xl text-uiyellow-900 font-semibold">
                Welcome to EduChain
              </h1>
              <p className="text-base mb-4 font-normal text-[#061a2b]">
                Let&apos;s start by creating your account
              </p>
              <div className="flex flex-col mb-2 space-y-2">
                <div className="formgrid grid form-inputs md:overflow-y-auto md:max-h-[50vh] mb-2">
                  <div className="field col-12">
                    <label
                      htmlFor="name"
                      className="block text-900 text-base font-medium "
                    >
                      School Name
                      <span className="ml-1 text-rose-400">*</span>
                    </label>
                    <InputText
                      id="name"
                      placeholder="School Name"
                      required
                      className="w-full px-2 py-1 bg-gray-200 ring-1 ring-uisky-400"
                      onChange={(e) => onInputChange(e, "name")}
                      value={registerData.name}
                    />
                  </div>
                  <div className="field col-12">
                    <label
                      htmlFor="name"
                      className="block text-900 text-basebase font-medium mb-2"
                    >
                      Address
                      <span className="ml-1 text-rose-400">*</span>
                    </label>
                    <InputTextarea
                      id="address"
                      placeholder="Address"
                      required
                      className="w-full px-2 py-1 bg-gray-200 ring-1 ring-uisky-400"
                      onChange={(e) => onInputChange(e, "address")}
                      value={registerData.address}
                    />
                  </div>
                  <div className="field col-12">
                    <label
                      htmlFor="email1"
                      className="block text-900 text-basebase font-medium mb-2"
                    >
                      Email
                      <span className="ml-1 text-rose-400">*</span>
                    </label>
                    <InputText
                      id="email1"
                      type="text"
                      required
                      placeholder="Email address"
                      className="w-full px-2 py-1 bg-gray-200 ring-1 ring-uisky-400"
                      onChange={(e) => onInputChange(e, "email")}
                      value={registerData.email}
                    />
                  </div>
                  <div className="field col-12 md:col-6">
                    <label
                      htmlFor="name"
                      className="block text-900 text-basebase font-medium mb-2"
                    >
                      Contact Person
                    </label>
                    <InputText
                      id="contactPerson"
                      placeholder="Contact Person"
                      className="w-full px-2 py-1 bg-gray-200 ring-1 ring-uisky-400"
                      onChange={(e) => onInputChange(e, "contactName")}
                      value={registerData.contactName}
                    />
                  </div>
                  <div className="field col-12 md:col-6">
                    <label
                      htmlFor="name"
                      className="block text-900 text-basebase font-medium mb-2"
                    >
                      Telephone
                      <span className="ml-1 text-rose-400">*</span>
                    </label>
                    <InputText
                      id="telephone"
                      placeholder="Telephone"
                      required
                      className="w-full px-2 py-1 bg-gray-200 ring-1 ring-uisky-400"
                      onChange={(e) => onInputChange(e, "telephone")}
                      value={registerData.telephone}
                    />
                  </div>
                  <div className="field col-12 md:col-6">
                    <label
                      htmlFor="name"
                      className="block text-900 text-basebase font-medium mb-2"
                    >
                      City
                      <span className="ml-1 text-rose-400">*</span>
                    </label>
                    <InputText
                      id="city"
                      placeholder="City"
                      required
                      className="w-full px-2 py-1 bg-gray-200 ring-1 ring-uisky-400"
                      onChange={(e) => onInputChange(e, "city")}
                      value={registerData.city}
                    />
                  </div>
                  <div className="field col-12 md:col-6">
                    <label
                      htmlFor="name"
                      className="block text-900 text-basebase font-medium mb-2"
                    >
                      Region/State
                      <span className="ml-1 text-rose-400">*</span>
                    </label>
                    <InputText
                      id="region"
                      placeholder="Region/State"
                      required
                      className="w-full px-2 py-1 bg-gray-200 ring-1 ring-uisky-400"
                      onChange={(e) => onInputChange(e, "region")}
                      value={registerData.region}
                    />
                  </div>
                  <div className="field col-12 md:col-6">
                    <label
                      htmlFor="name"
                      className="block text-900 text-basebase font-medium mb-2"
                    >
                      Country
                      <span className="ml-1 text-rose-400">*</span>
                    </label>
                    <InputText
                      id="country"
                      placeholder="Country"
                      required
                      className="w-full px-2 py-1 bg-gray-200 ring-1 ring-uisky-400"
                      onChange={(e) => onInputChange(e, "country")}
                      value={registerData.country}
                    />
                  </div>
                  <div className="field col-12 md:col-6">
                    <label
                      htmlFor="name"
                      className="block text-900 text-basebase font-medium mb-2"
                    >
                      Date Founded
                      <span className="ml-1 text-rose-400">*</span>
                    </label>
                    <Calendar
                      id="date"
                      className="w-full px-2 py-1 bg-gray-200 ring-1 ring-uisky-400"
                      dateFormat="dd/mm/yy"
                      showIcon
                      required
                      onChange={(e) => onDateChange(e)}
                      value={registerData.dateFounded}
                    />
                  </div>
                  <div className="field col-12">
                    <label
                      htmlFor="name"
                      className="block text-900 text-basebase font-medium mb-2"
                    >
                      School Logo
                      <span className="ml-1 text-rose-400">*</span>
                    </label>
                    <input
                      type="file"
                      className="fileform-input"
                      required
                      accept="image/*"
                      onChange={(e) => handleFile(e)}
                    />
                  </div>
                </div>
              </div>
              <Button
                label="Continue"
                className="w-full bg-[#245763] text-white p-2 md:p-3 hover:bg-[#061a2b]"
                loading={loading}
                type="submit"
              ></Button>
              <p
                className={`${lusitana.className} text-base md:text-lg mt-2 flex justify-between items-center text-[#061a2b]`}
              >
                <span>Already registered?</span>
                <Link href="/login">
                  <strong className="text-[#5a5a95]">Login here</strong>
                </Link>
              </p>
            </>
          </form>
        )}
        {activeViewIndex === 1 && <UserForm newUserData={newUserData} />}
        <div className="text-center">
          <span> © 2024 EduChain. All rights reserved. </span>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
