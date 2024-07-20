/* eslint-disable @next/next/no-img-element */
"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, {
  useContext,
  useState,
  useRef,
  Dispatch,
  SetStateAction,
} from "react";
import { Checkbox } from "primereact/checkbox";
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
      <div className="items-center flex flex-col">
        <h1 className="text-2xl font-bold mb-4">Sign up</h1>
      </div>
      <form onSubmit={handleSubmit(onUserSubmit)} className="flex flex-col">
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
                  className={`w-full mb-2 p-2 bg-gray-100 ${
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
                  className={`w-full mb-2 p-2 bg-gray-100 ${
                    errors.email ? "p-invalid" : ""
                  }`}
                />
              )}
            />
          </div>
          <div className="field col-12 md:col-6">
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
                  className={`w-full mb-2 p-2 bg-gray-100 ${
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
                  className={`w-full mb-2 p-2 bg-gray-100 ${
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
        <div className="md:mt-3 text-center">
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
    <div className="min-h-screen w-screen flex justify-center items-center bg-gray-100">
      <Toast ref={toast} />
      <div className="overlay-container hidden md:flex md:w-1/2 bg-gradient-to-r from-[#5a5a95] to-[#245763] text-white p-8 items-center justify-center flex-col">
        <div className="overlay-panel text-center">
          {activeViewIndex === 0 && (
            <>
              <h1 className="text-2xl font-bold mb-4">
                Welcome to <span className="text-white">EduChain</span>
              </h1>
              <p className="text-sm mb-2">
                Please fill in the spaces to register your school
              </p>
              <p className="text-sm">
                Marked <span className="text-rose-600 text-bold">( * )</span>{" "}
                inputs are required
              </p>
            </>
          )}
          {activeViewIndex === 1 && (
            <>
              <h1 className="text-2xl font-bold mb-4">
                Thank you for creating an account with us.
              </h1>
              <p className="text-sm mb-8">
                Please create an Admin user to login into your dashboard
              </p>
            </>
          )}
        </div>
      </div>
      <div className="container bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-md">
        <div className="form-container sign-in-container py-8 px-4 p-md-8 w-full">
          {activeViewIndex === 0 && (
            <>
              {" "}
              <div className="items-center flex flex-col">
                <h1 className="text-2xl font-bold mb-4">Sign up</h1>
              </div>
              <form onSubmit={register} className="flex flex-col">
                <div className="formgrid grid form-inputs md:overflow-y-auto md:max-h-[50vh] mb-2">
                  <div className="field col-12">
                    <label
                      htmlFor="name"
                      className="block text-900 text-base font-medium mb-2"
                    >
                      School Name
                      <span className="ml-1 text-rose-400">*</span>
                    </label>
                    <InputText
                      id="name"
                      placeholder="School Name"
                      required
                      className="w-full mb-2 p-2 bg-gray-200"
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
                      className="w-full p-2 bg-gray-200 mb-2"
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
                      className="w-full p-2 bg-gray-200 mb-2"
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
                      className="w-full p-2 bg-gray-200 mb-2"
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
                      className="w-full p-2 bg-gray-200 mb-2"
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
                      className="w-full p-2 bg-gray-200 mb-2"
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
                      className="w-full p-2 bg-gray-200 mb-2"
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
                      className="w-full p-2 bg-gray-200 mb-2"
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
                      className="w-full p-2 bg-gray-200 mb-2"
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
                <div className="md:mt-3 text-center">
                  <Button
                    label="Continue"
                    className="w-full bg-[#245763] text-white p-2 md:p-3 hover:bg-[#061a2b]"
                    loading={loading}
                    type="submit"
                  ></Button>
                  <p
                    className={`${lusitana.className} text-base md:text-lg mt-2 text-[#061a2b]`}
                  >
                    Already registered? Click{" "}
                    <Link href="/login">
                      <strong className="text-[#5a5a95]">here</strong>
                    </Link>{" "}
                    to login.
                  </p>
                </div>
              </form>{" "}
            </>
          )}

          {activeViewIndex === 1 && <UserForm newUserData={newUserData} />}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
