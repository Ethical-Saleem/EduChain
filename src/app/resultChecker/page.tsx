"use client";

import React, { useState } from "react";
import AcmeLogo from "@/app/ui/acme-logo";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { lusitana } from "@/app/ui/fonts";
import { inter } from "@/app/ui/fonts";
import Image from "next/image";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { SchoolService } from "@/app/services/SchoolService";
import { Demo } from "../../../types";
import DownloadPDFButton from "@/components/PDFDownloadButton";

const ResultCheckPage = () => {
  const [studentNo, setStudentNo] = useState("");
  const [year, setYear] = useState<Nullable<Date>>(null);
  const [parsedYear, setParsedYear] = useState("");
  const [record, setRecord] = useState({} as Demo.Result);
  const [error, setError] = useState("");
  const [resultDialog, setResultDialog] = useState(false);
  const [errorDialog, setErrorDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const showResult = (data: Demo.Result) => {
    setRecord(data);
    setResultDialog(true);
  };
  const closeResultDialog = () => {
    setResultDialog(false);
    setRecord({} as Demo.Result);
  };

  const showError = (error: any) => {
    setError(error);
    setErrorDialog(true);
  };
  const hideError = () => {
    setErrorDialog(false);
  };

  const convertToISO = (date: Date | null | undefined): string => {
    if (!date) {
      throw new Error("Invalid Date");
    }

    return date.toISOString();
  };

  const formatYear = (date: Date) => {
    const d = new Date(date);
    return d.getFullYear();
  };

  const searchData = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const yearString = convertToISO(year);
    setParsedYear(yearString);

    console.log("", studentNo, yearString);

    try {
      const result = await SchoolService.dispatchFetchStudentResultRecord(
        studentNo,
        yearString
      );
      if (result) {
        console.log("search-result", result);
        showResult(result);
        setLoading(false);
      }
    } catch (error: any) {
      console.log("search-error", error);
      showError(error);
      setLoading(false);
    }
  };

  const ResultDialogFooter = () => {
    return (
      <div className="text-right flex mt-4">
        <DownloadPDFButton studentNo={studentNo} year={parsedYear} />
        <Button label="Close" icon="pi pi-times" outlined onClick={closeResultDialog} className="ml-4 text-[#5a5a95] p-2 border border-[#5a5a95] hover:border-[#5a5a95]" />
      </div>
    );
  };

  const ResultDialogHeader = () => {
    return (
      <div className="py-2 px-4 bg-gray-200">
        <h6 className="text-gray-800">
          {record ? `${record.surname} ${record.otherNames}` : "Result Record"}
        </h6>
      </div>
    );
  };

  const ErrorDialogFooter = () => {
    return (
      <>
        <Button
          label="Dismiss"
          icon="pi pi-times"
          severity="danger"
          text
          className="text-red-500"
          onClick={hideError}
        />
      </>
    );
  };

  const dialogStyle = {
    backgroundImage: `linear-gradient(rgba(6, 26, 43, 0.7), rgba(6, 26, 43, 0.7)), url(${record?.school?.logoUrl})`,
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    color: "#ffffff",
  };

  return (
    <main className="flex min-h-screen flex-col px-0 py-2 md:p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-[#245763] p-4 md:h-52">
        <AcmeLogo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-[#061a2b] px-3 py-10 md:px-20 border border-[#5a5a95]">
          <p
            className={`${lusitana.className} text-xl text-[#ffffff] md:text-3xl md:leading-normal`}
          >
            <strong>Welcome to EduChain.</strong>
          </p>
          <p
            className={`${lusitana.className} text-xl text-[#d1d5db] md:text-2xl md:leading-normal`}
          >
            Please provide the{" "}
            <strong className="text-[#5a5a95]">Student Number</strong> and{" "}
            <strong className="text-[#5a5a95]">Graduation Year</strong> to
            search for the corresponding result record.
          </p>
        </div>
        <div className="px-3 md:px-20">
          <form onSubmit={searchData}>
            <div className="flex grow flex-col md:flex-row md:gap-4">
              <div className="field lg:w-3/5">
                <label className="block text-xl font-medium mb-2 text-grey-400">
                  Student Number
                </label>
                <InputText
                  className="w-full p-2 search-input bg-[#5a5a95] text-white border border-[#5a5a95]"
                  required
                  id="studentNo"
                  value={studentNo}
                  onChange={(e) => setStudentNo(e.target.value)}
                />
              </div>
              <div className="field lg:w-1/5">
                <label className="block text-xl font-medium mb-2 text-grey-400">
                  Year of Graduation
                </label>
                <Calendar
                  className="w-full date-search-input bg-[#5a5a95] text-white border border-[#5a5a95]"
                  required
                  value={year}
                  onChange={(e) => setYear(e.value)}
                  view="year"
                  dateFormat="yy"
                />
              </div>
              <div className="field xl:w-1/5 flex items-end">
                <Button
                  label="Search"
                  type="submit"
                  icon="pi pi-fw pi-search"
                  severity="help"
                  loading={loading}
                  className="search-button w-full bg-[#5a5a95] text-white border-none"
                />
              </div>
            </div>
          </form>
        </div>

        <div className="relative w-0 h-0 border-l-[15px] border-r-[15px] border-b-[26px] border-l-transparent border-r-transparent border-b-[#061a2b]" />
      </div>

      <Dialog
        visible={resultDialog}
        modal
        maximizable
        style={{ width: "100vw" }}
        header={ResultDialogHeader}
        footer={ResultDialogFooter}
        onHide={closeResultDialog}
      >
        <div className="" style={{ ...dialogStyle }}>
          <div className="personal border mb-2 p-2 bg-opacity-80">
            <h6 className="text-white">Personal Details</h6>
            <div className="custom-grid md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-2 py-3 px-3 text-white">
              <div className="col-span-3 md:col-span-1">
                <span className="text-sm">Student No.:</span>
                <p className="font-bold">{record.studentNumber}</p>
              </div>
              <div className="col-span-3 md:col-span-1">
                <span className="text-sm">Email:</span>
                <p className="font-bold">{record.email ? record.email : "-"}</p>
              </div>
              <div className="col-span-3 md:col-span-1">
                <span className="text-sm">Phone Number:</span>
                <p className="font-bold">
                  {record.phoneNumberOne ? record.phoneNumberOne : "-"}
                </p>
              </div>
              <div className="col-span-3 md:col-span-1">
                <span className="text-sm">Mobile Number:</span>
                <p className="font-bold">
                  {record.phoneNumberTwo ? record.phoneNumberTwo : "-"}
                </p>
              </div>
              <div className="col-span-2">
                <span className="text-sm">Street Address:</span>
                <p className="font-bold">
                  {record.streetAddress ? record.streetAddress : "-"}
                </p>
              </div>
              <div className="col-span-3 md:col-span-1">
                <span className="text-sm">City:</span>
                <p className="font-bold">{record.city ? record.city : "-"}</p>
              </div>
              <div className="col-span-3 md:col-span-1">
                <span className="text-sm">State:</span>
                <p className="font-bold">{record.state ? record.state : "-"}</p>
              </div>
              <div className="col-span-3 md:col-span-1">
                <span className="text-sm">Country:</span>
                <p className="font-bold">
                  {record.country ? record.country : "-"}
                </p>
              </div>
            </div>
          </div>
          <div
            className="school border mb-2 p-2 bg-opacity-80"
            style={{ backgroundColor: "#245763" }}
          >
            <h6 className="text-white">School Details</h6>
            <div className="custom-grid md:grid-cols-3 xl:grid-cols-4 p-3 text-white">
              <div className="col-span-3 md:col-span-1">
                <span className="text-sm">School Name:</span>
                <p className="font-bold">
                  {record.school?.name ? record.school?.name : "-"}
                </p>
              </div>
              <div className="col-span-3 md:col-span-1">
                <span className="text-sm">Address:</span>
                <p className="font-bold">
                  {record.school?.address ? record.school?.address : "-"}
                </p>
              </div>
              <div className="col-span-3 md:col-span-1">
                <span className="text-sm">State/Region:</span>
                <p className="font-bold">
                  {record.school?.region ? record.school?.region : "-"}
                </p>
              </div>
              <div className="col-span-3 md:col-span-1">
                <span className="text-sm">Email:</span>
                <p className="font-bold">
                  {record.school?.email ? record.school?.email : "-"}
                </p>
              </div>
              <div className="col-span-3 md:col-span-1">
                <span className="text-sm">Telephone:</span>
                <p className="font-bold">
                  {record.school?.telephone ? record.school?.telephone : "-"}
                </p>
              </div>
            </div>
            <div className="custom-grid md:grid-cols-2 xl:grid-cols-3 gap-4 px-3 text-white">
              <div className="col-span-3 md:col-span-1">
                <span className="text-sm">Degree:</span>
                <p className="font-bold">
                  {record.degree ? record.degree : "-"}
                </p>
              </div>
              <div className="col-span-3 md:col-span-1">
                <span className="text-sm">Grade:</span>
                <p className="font-bold">{record.grade ? record.grade : "-"}</p>
              </div>
              <div className="col-span-3 md:col-span-1">
                <span className="text-sm">Year of Graduation:</span>
                <p className="font-bold">
                  {record.yearOfGrad ? formatYear(record.yearOfGrad) : "-"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Dialog>

      <Dialog
        visible={errorDialog}
        style={{ width: "450px" }}
        header="Error"
        modal
        footer={ErrorDialogFooter}
        onHide={hideError}
      >
        <div className="flex align-items-center justify-content-center">
          <i
            className="pi pi-exclamation-triangle text-red-700 mr-3"
            style={{ fontSize: "2rem" }}
          />
          {error && (
            <strong>
              <span className={`${inter.className}`}>{error}</span>
            </strong>
          )}
        </div>
      </Dialog>
    </main>
  );
};

export default ResultCheckPage;
