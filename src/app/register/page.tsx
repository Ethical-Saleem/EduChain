/* eslint-disable @next/next/no-img-element */
"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { useContext, useState, useRef } from "react";
import { Checkbox } from "primereact/checkbox";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { LayoutContext } from "../../../layout/context/layoutcontext";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { FileUpload } from "primereact/fileupload";
import { classNames } from "primereact/utils";
import { Demo } from "../../../types";
import { lusitana } from "../ui/fonts";

import { AuthenticationService } from "../services/AuthenticationService";
import { InputTextarea } from "primereact/inputtextarea";
import { error } from "console";
import { clearPreviewData } from "next/dist/server/api-utils";

const RegisterPage = () => {
  const emptyData: Demo.NewSchool = {
    Name: "",
    Address: "",
    City: "",
    Region: "",
    PostalCode: "",
    ContactName: "",
    Country: "",
    Email: "",
    Telephone: "",
    DateFounded: null,
    SchoolType: 0,
    LogoUrl: null,
  };
  const emptyUserData: Demo.NewUser = {
    name: "",
    email: "",
    telephone: "",
    password: "",
    schoolId: 0,
  };
  const [registerData, setRegisterData] = useState<Demo.NewSchool>(emptyData);
  const [newUserData, setNewUserData] = useState<Demo.NewUser>(emptyUserData);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSchoolCreated, setIsSchoolCreated] = useState(false);
  const { layoutConfig } = useContext(LayoutContext);
  const toast = useRef<Toast>(null);

  const [testFile, setTestFile] = useState(null);
  const [fileDetails, setFileDetails] = useState<Demo.FileDetail>();

  const fileUploadRef = useRef<FileUpload>(null);

  const router = useRouter();
  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: string
  ) => {
    const val = (e.target && e.target.value) || "";
    let _data = { ...registerData };
    _data[`${name}`] = val;

    setRegisterData(_data);
  };

  const onInputUserChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: string
  ) => {
    const val = (e.target && e.target.value) || "";
    let _data = { ...newUserData };
    _data[`${name}`] = val;

    setNewUserData(_data);
  };

  const onDateChange = (e: { value: Date | null | undefined }) => {
    setRegisterData((prevData) => ({
      ...prevData,
      dateFounded: e.value,
    }));
  };

  //   const formatSize = (bytes: number) => {
  //     const k = 1024;
  //     const dm = 3;
  //     const sizes = $primereact.config.locale.fileSizeTypes;

  //     if (bytes === 0) {
  //       return `0 ${sizes[0]}`;
  //     }

  //     const i = Math.floor(Math.log(bytes) / Math.log(k));
  //     const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

  //     return `${formattedSize} ${sizes[i]}`;
  //   };

  const handleFile = (event: any) => {
    setRegisterData((prevData) => ({
      ...prevData,
      LogoUrl: event.target.files[0],
    }));
    setTestFile(event.target.files[0]);
    const file = event.target.files[0];
    console.log("testFile", testFile);
    console.log("fileInput", file);
  };

  const register = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("register-data", registerData);
    setLoading(true);
    try {
      const res = await AuthenticationService.register(registerData);
      console.log(res);
      if (res) {
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: "Login successful",
          life: 3000,
        });

        setNewUserData((prevData) => ({
          ...prevData,
          email: res.email,
          telephone: res.telephone,
          schoolId: res.id
        }))

        setIsSchoolCreated(true);
        setLoading(false);
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

  const createUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await AuthenticationService.registerUser(newUserData);
      console.log(res);
      if (res) {
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: "Login successful",
          life: 3000,
        });

        router.push("/login");
        setLoading(false);
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
    <div className="min-h-screen w-screen flex justify-center items-center bg-blue-100 overflow-hidden">
      <Toast ref={toast} />
      <div className="overlay-container hidden md:flex md:w-1/2 bg-gradient-to-r from-pink-500 to-red-500 text-white p-4 p-lg-8 items-center justify-center flex-col">
        <div className="overlay-panel text-center">
          <h1 className="text-2xl font-bold mb-4">
            Welcome to <span className="text-white">EduChain</span>
          </h1>
          {!isSchoolCreated && <p className="text-sm mb-8">
            Please fill in the spaces to register your school
          </p>}
          {isSchoolCreated && <p className="text-sm mb-8">
            Please create a super user to login into your dashboard
          </p>}
        </div>
      </div>
      <div className="container bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-md">
        <div className="form-container sign-in-container py-8 px-4 p-md-8 w-full">
          {!isSchoolCreated && (
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
                    </label>
                    <InputText
                      id="name"
                      placeholder="School Name"
                      className="w-full mb-2 p-2 bg-gray-200"
                      onChange={(e) => onInputChange(e, "Name")}
                      value={registerData.Name}
                    />
                  </div>
                  <div className="field col-12">
                    <label
                      htmlFor="name"
                      className="block text-900 text-basebase font-medium mb-2"
                    >
                      Address
                    </label>
                    <InputTextarea
                      id="address"
                      placeholder="Address"
                      className="w-full p-2 bg-gray-200 mb-2"
                      onChange={(e) => onInputChange(e, "Address")}
                      value={registerData.Address}
                    />
                  </div>
                  <div className="field col-12">
                    <label
                      htmlFor="email1"
                      className="block text-900 text-basebase font-medium mb-2"
                    >
                      Email
                    </label>
                    <InputText
                      id="email1"
                      type="text"
                      placeholder="Email address"
                      className="w-full p-2 bg-gray-200 mb-2"
                      onChange={(e) => onInputChange(e, "Email")}
                      value={registerData.Email}
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
                      onChange={(e) => onInputChange(e, "ContactName")}
                      value={registerData.ContactName}
                    />
                  </div>
                  <div className="field col-12 md:col-6">
                    <label
                      htmlFor="name"
                      className="block text-900 text-basebase font-medium mb-2"
                    >
                      Telephone
                    </label>
                    <InputText
                      id="telephone"
                      placeholder="Telephone"
                      className="w-full p-2 bg-gray-200 mb-2"
                      onChange={(e) => onInputChange(e, "Telephone")}
                      value={registerData.Telephone}
                    />
                  </div>
                  <div className="field col-12 md:col-6">
                    <label
                      htmlFor="name"
                      className="block text-900 text-basebase font-medium mb-2"
                    >
                      City
                    </label>
                    <InputText
                      id="city"
                      placeholder="City"
                      className="w-full p-2 bg-gray-200 mb-2"
                      onChange={(e) => onInputChange(e, "City")}
                      value={registerData.City}
                    />
                  </div>
                  <div className="field col-12 md:col-6">
                    <label
                      htmlFor="name"
                      className="block text-900 text-basebase font-medium mb-2"
                    >
                      Region/State
                    </label>
                    <InputText
                      id="region"
                      placeholder="Region/State"
                      className="w-full p-2 bg-gray-200 mb-2"
                      onChange={(e) => onInputChange(e, "Region")}
                      value={registerData.Region}
                    />
                  </div>
                  <div className="field col-12 md:col-6">
                    <label
                      htmlFor="name"
                      className="block text-900 text-basebase font-medium mb-2"
                    >
                      Country
                    </label>
                    <InputText
                      id="country"
                      placeholder="Country"
                      className="w-full p-2 bg-gray-200 mb-2"
                      onChange={(e) => onInputChange(e, "Country")}
                      value={registerData.Country}
                    />
                  </div>
                  <div className="field col-12 md:col-6">
                    <label
                      htmlFor="name"
                      className="block text-900 text-basebase font-medium mb-2"
                    >
                      Date Founded
                    </label>
                    <Calendar
                      id="date"
                      className="w-full p-2 bg-gray-200 mb-2"
                      dateFormat="dd/mm/yy"
                      showIcon
                      onChange={(e) => onDateChange}
                      value={registerData.DateFounded}
                    />
                  </div>
                  <div className="field col-12">
                    <label
                      htmlFor="name"
                      className="block text-900 text-basebase font-medium mb-2"
                    >
                      School Logo
                    </label>
                    <input
                      type="file"
                      className="fileform-input"
                      accept="image/*"
                      onChange={(e) => handleFile(e)}
                    />
                  </div>
                </div>
                <div className="md:mt-3 text-center">
                  <Button
                    label="Continue"
                    className="w-full p-2 md:p-3 bg-red-500 text-white"
                    loading={loading}
                    type="submit"
                  ></Button>
                  <p
                    className={`${lusitana.className} text-base md:text-lg mt-2`}
                  >
                    Already registered? Click{" "}
                    <Link href="/login">
                      <strong>here</strong>
                    </Link>{" "}
                    to login.
                  </p>
                </div>
              </form>{" "}
            </>
          )}

          {isSchoolCreated && (
            <>
              <div className="items-center flex flex-col">
                <h1 className="text-2xl font-bold mb-4">Sign up</h1>
              </div>
              <form onSubmit={createUser} className="flex flex-col">
                <div className="formgrid grid form-inputs md:overflow-y-auto md:max-h-[50vh] mb-2">
                  <div className="field col-12">
                    <label
                      htmlFor="name"
                      className="block text-900 text-base font-medium mb-2"
                    >
                      UserName
                    </label>
                    <InputText
                      id="name"
                      placeholder="School Name"
                      className="w-full mb-2 p-2 bg-gray-200"
                      onChange={(e) => onInputUserChange(e, "name")}
                      value={newUserData.name}
                    />
                  </div>
                  <div className="field col-12">
                    <label
                      htmlFor="email1"
                      className="block text-900 text-basebase font-medium mb-2"
                    >
                      Email
                    </label>
                    <InputText
                      id="email1"
                      type="text"
                      placeholder="Email address"
                      className="w-full p-2 bg-gray-200 mb-2"
                      onChange={(e) => onInputUserChange(e, "email")}
                      value={newUserData.email}
                    />
                  </div>
                  <div className="field col-12 md:col-6">
                    <label
                      htmlFor="name"
                      className="block text-900 text-basebase font-medium mb-2"
                    >
                      Telephone
                    </label>
                    <InputText
                      id="telephone"
                      placeholder="Telephone"
                      className="w-full p-2 bg-gray-200 mb-2"
                      onChange={(e) => onInputUserChange(e, "telephone")}
                      value={newUserData.telephone}
                    />
                  </div>
                  <div className="field col-12">
                    <label
                      htmlFor="password1"
                      className="block text-900 font-medium text-basebase mb-2"
                    >
                      Default Password
                    </label>
                    <Password
                      inputId="password1"
                      value={newUserData.password}
                      onChange={(e) => onInputUserChange(e, "password")}
                      placeholder="Password"
                      toggleMask
                      className="w-full mb-2"
                      inputClassName="w-full p-2 bg-gray-200"
                    ></Password>
                  </div>
                </div>
                <div className="md:mt-3 text-center">
                  <Button
                    label="Continue"
                    className="w-full p-2 md:p-3 bg-red-500 text-white"
                    loading={loading}
                    type="submit"
                  ></Button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
