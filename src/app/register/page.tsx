/* eslint-disable @next/next/no-img-element */
"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { useContext, useState, useRef } from "react";
import { Checkbox } from "primereact/checkbox";
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

const RegisterPage = () => {
  const emptyData: Demo.NewSchool = {
    Name: "",
    Description: "",
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
    SchoolLogo: null,
    Password: "",
  };
  const [registerData, setRegisterData] = useState<Demo.NewSchool>(emptyData);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const { layoutConfig } = useContext(LayoutContext);

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
      SchoolLogo: event.target.files[0],
    }));
    setTestFile(event.target.files[0]);
    const file = event.target.files[0];
    console.log("testFile", testFile);
    console.log("fileInput", file);
  };

  const register = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('register-data', registerData)
    setLoading(true);
    try {
      const res = await AuthenticationService.register(registerData);
      console.log(res);
      if (res) {
        router.push('/')
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      throw new Error(error);
    }
  };

  const containerClassName = classNames(
    "surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden",
    { "p-input-filled": layoutConfig.inputStyle === "filled" }
  );

  return (
    <div className={containerClassName}>
      <div className="flex flex-column align-items-center justify-content-center">
        <img
          src={`/layout/images/logo-${
            layoutConfig.colorScheme === "light" ? "dark" : "white"
          }.svg`}
          alt="Sakai logo"
          className="mb-5 w-6rem flex-shrink-0"
        />
        <div
          style={{
            borderRadius: "56px",
            padding: "0.3rem",
            background:
              "linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)",
          }}
        >
          <div
            className="w-full surface-card py-5 px-5 sm:px-8"
            style={{ borderRadius: "53px" }}
          >
            <div className="text-center mb-5">
              <img
                src="/demo/images/login/avatar.png"
                alt="Image"
                height="50"
                className="mb-3"
              />
              <div className="text-900 text-3xl font-medium mb-3">Welcome,</div>
              <span className="text-600 font-medium">
                Please fill in the spaces to register your school
              </span>
            </div>

            <form onSubmit={register}>
              <div className="field">
                <label
                  htmlFor="name"
                  className="block text-900 text-xl font-medium mb-2"
                >
                  School Name
                </label>
                <InputText
                  id="name"
                  placeholder="School Name"
                  className="w-full md:w-30rem mb-3"
                  onChange={(e) => onInputChange(e, "Name")}
                  value={registerData.Name}
                />
              </div>
              <div className="field">
                <label
                  htmlFor="name"
                  className="block text-900 text-xl font-medium mb-2"
                >
                  Address
                </label>
                <InputTextarea
                  id="address"
                  placeholder="Address"
                  className="w-full md:w-30rem mb-3"
                  onChange={(e) => onInputChange(e, "Address")}
                  value={registerData.Address}
                />
              </div>
              <div className="field">
                <label
                  htmlFor="email1"
                  className="block text-900 text-xl font-medium mb-2"
                >
                  Email
                </label>
                <InputText
                  id="email1"
                  type="text"
                  placeholder="Email address"
                  className="w-full md:w-30rem mb-3"
                  onChange={(e) => onInputChange(e, "Email")}
                  value={registerData.Email}
                />
              </div>
              <div className="field">
                <label
                  htmlFor="name"
                  className="block text-900 text-xl font-medium mb-2"
                >
                  Contact Person
                </label>
                <InputText
                  id="contactPerson"
                  placeholder="Contact Person"
                  className="w-full md:w-30rem mb-3"
                  onChange={(e) => onInputChange(e, "ContactName")}
                  value={registerData.ContactName}
                />
              </div>
              <div className="field">
                <label
                  htmlFor="name"
                  className="block text-900 text-xl font-medium mb-2"
                >
                  Telephone
                </label>
                <InputText
                  id="telephone"
                  placeholder="Telephone"
                  className="w-full md:w-30rem mb-3"
                  onChange={(e) => onInputChange(e, "Telephone")}
                  value={registerData.Telephone}
                />
              </div>
              <div className="field">
                <label
                  htmlFor="name"
                  className="block text-900 text-xl font-medium mb-2"
                >
                  City
                </label>
                <InputText
                  id="city"
                  placeholder="City"
                  className="w-full md:w-30rem mb-3"
                  onChange={(e) => onInputChange(e, "City")}
                  value={registerData.City}
                />
              </div>
              <div className="field">
                <label
                  htmlFor="name"
                  className="block text-900 text-xl font-medium mb-2"
                >
                  Region/State
                </label>
                <InputText
                  id="region"
                  placeholder="Region/State"
                  className="w-full md:w-30rem mb-3"
                  onChange={(e) => onInputChange(e, "Region")}
                  value={registerData.Region}
                />
              </div>
              <div className="field">
                <label
                  htmlFor="name"
                  className="block text-900 text-xl font-medium mb-2"
                >
                  Country
                </label>
                <InputText
                  id="country"
                  placeholder="Country"
                  className="w-full md:w-30rem mb-3"
                  onChange={(e) => onInputChange(e, "Country")}
                  value={registerData.Country}
                />
              </div>
              <div className="field">
                <label
                  htmlFor="name"
                  className="block text-900 text-xl font-medium mb-2"
                >
                  Date Founded
                </label>
                <Calendar
                  id="date"
                  className="w-full md:w-30rem mb-3"
                  dateFormat="dd/mm/yy"
                  showIcon
                  onChange={(e) => onDateChange}
                  value={registerData.DateFounded}
                />
              </div>
              <div className="field">
                <label
                  htmlFor="name"
                  className="block text-900 text-xl font-medium mb-2"
                >
                  School Logo
                </label>
                <input type="file" className="fileform-input" accept="image/*" onChange={(e) => handleFile(e)} />
              </div>
              <div className="field">
                <label
                  htmlFor="password1"
                  className="block text-900 font-medium text-xl mb-2"
                >
                  Default Password
                </label>
                <Password
                  inputId="password1"
                  value={registerData.Password}
                  onChange={(e) => onInputChange(e, "Password")}
                  placeholder="Password"
                  toggleMask
                  className="w-full mb-5"
                  inputClassName="w-full p-3 md:w-30rem"
                ></Password>
              </div>
              <Button
                label="Continue"
                className="w-full p-3 text-xl"
                loading={loading}
                type="submit"
              ></Button>
            </form>
            <div className="mt-3 text-center">
              <p className={`${lusitana.className} text-lg`}>
                Already registered? Click {" "}
                <Link href="/">
                  <strong>here</strong>
                </Link>{" "}
                to login.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
