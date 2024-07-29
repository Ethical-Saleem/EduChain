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
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";
import { SchoolService } from "@/app/services/SchoolService";
import { Demo } from "../../../types";
import ResultViewPage from "@/components/ResultViewPage";
import DownloadPDFButton from "@/components/PDFDownloadButton";

const ResultCheckPage = () => {
  const [studentNo, setStudentNo] = useState("");
  const [year, setYear] = useState<Nullable<Date>>(null);
  const [nin, setNin] = useState<string | null>(null);
  const [parsedYear, setParsedYear] = useState<number | null>(null);
  const [record, setRecord] = useState<Demo.Result | null>(null);
  const [error, setError] = useState("");
  const [resultDialog, setResultDialog] = useState(false);
  const [errorDialog, setErrorDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeViewState, setActiveViewState] = useState(0);
  const [filterParam, setFilterParam] = useState<number>(0);
  const [yearParam, setYearParam] = useState<boolean>(false);
  const [ninParam, setNinParam] = useState<boolean>(false);

  const showResult = (data: Demo.Result) => {
    setRecord(data);
    setResultDialog(true);
  };
  const closeResultDialog = () => {
    setResultDialog(false);
    setRecord(null);
  };

  const showError = (error: any) => {
    setError(error);
    setErrorDialog(true);
  };
  const hideError = () => {
    setErrorDialog(false);
  };

  const formatYear = (date: Date) => {
    const d = new Date(date);
    return d.getFullYear();
  };

  const searchData = async () => {
    setLoading(true);

    if (!year && !nin) {
      alert('Either one of Year of Graduation or NIN must be provided')
      setLoading(false)
    }

    if (year) {
      const yearString = formatYear(year);

      setParsedYear(yearString);
      setNin(null);

      console.log("", studentNo, yearString, nin);
      try {
        if (year && !nin) {
          const result = await SchoolService.dispatchFetchStudentResultRecord(
            studentNo,
            yearString
          );
          if (result) {
            console.log("search-result", result);
            showResult(result);
            setRecord(result);
            setLoading(false);
          }
        }
      } catch (error: any) {
        console.log("search-error", error);
        if (error.response) {
          showError(error.response.data.message);
        } else if (error.message) {
          showError(error.message);
        } else {
          showError(error);
        }
        setLoading(false);
      }
    }
    if (nin && !year) {
      console.log("", studentNo, nin);
      try {
        const result = await SchoolService.dispatchFetchStudentResultRecord(
          studentNo,
          null,
          nin
        );
        if (result) {
          console.log("search-nin-result", result);
          showResult(result);
          setRecord(result);
          setLoading(false);
        }
      } catch (error: any) {
        console.log("search-error", error);
        if (error.response) {
          showError(error.response.data.message);
        } else if (error.message) {
          showError(error.message);
        } else {
          showError(error);
        }
        setLoading(false);
      }
    }
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

  return (
    <div className="bg-uimuted-100 dark:bg-uimuted-900 pb-20">
      <div className="bg-muted-100 dark:bg-muted-900 relative min-h-screen w-full overflow-x-hidden px-4 transition-all duration-300 xl:px-10 xl:max-w-[100%]">
        {!record && (
          <div className="mx-auto w-full max-w-7xl md:overflow-hidden">
            <div>
              <div className="relative z-[1] flex h-8 items-center gap-2 md:overflow-hidden"></div>
              <main>
                <div>
                  <div className="py-6">
                    <div className="flex min-h-[450px] items-center">
                      <div className="flex w-full flex-col items-center md:flex-row">
                        {activeViewState === 0 && (
                          <div className="w-full md:w-1/2">
                            <div className="max-w-md space-y-3 p-4">
                              <h2 className="text-2xl md:text-4xl font-bold text-uiyellow-600">
                                Welcome to EduChain
                              </h2>
                              <p className="font-normal lead-normal text-uiblue-400">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Hic dolorem minima animi sint
                                voluptate saepe quia, doloremque laudantium unde
                                delectus, corporis id aliquam nostrum ullam quis
                                nam itaque. Iure, earum.
                              </p>
                              <div className="flex gap-2">
                                <button onClick={() => setActiveViewState(1)} className="rounded-md ring-1 ring-uiblue-500 w-32 bg-uiyellow-500 text-white p-2">
                                  Continue
                                </button>
                                {/* <button className="rounded-md ring-1 ring-uiyellow-500 w-32 bg-uiblue-500 text-white p-2">
                                  Learn more
                                </button> */}
                              </div>
                            </div>
                          </div>
                        )}
                        {activeViewState === 1 && (
                          <div className="w-full md:w-1/2">
                            <div className="max-w-md space-y-3 p-4">
                              <h2 className="text-2xl font-bold text-uiyellow-600">
                                Search for a Record
                              </h2>
                              <p className="font-normal lead-normal text-uiblue-400">
                                Select the search params to filter with.
                              </p>
                              <div className="flex flex-wrap gap-3 mb-5">
                                <div className="flex align-items-center">
                                  <Checkbox
                                    inputId="yearCheck"
                                    name="yearOfGrad"
                                    value={1}
                                    onChange={(e) => setFilterParam(e.value)}
                                    checked={filterParam === 1}
                                  />
                                  <label
                                    htmlFor="yearCheck"
                                    className="ml-2 text-uiyellow-400"
                                  >
                                    Year
                                  </label>
                                </div>
                                <div className="flex align-items-center">
                                  <Checkbox
                                    inputId="ninCheck"
                                    name="nin"
                                    value={2}
                                    onChange={(e) => setFilterParam(e.value)}
                                    checked={filterParam === 2}
                                  />
                                  <label
                                    htmlFor="ninCheck"
                                    className="ml-2 text-uiyellow-400"
                                  >
                                    NIN
                                  </label>
                                </div>
                              </div>
                              <form className="space-y-4 pb-4">
                                <div className="flex flex-column gap-2">
                                  <label
                                    htmlFor="studentNumber"
                                    className="text-uiblue-400"
                                  >
                                    Student Number
                                  </label>
                                  <div className="p-inputgroup flex ring-1 ring-uisky-200 rounded-md w-full">
                                    <span className="p-inputgroup-addon flex-shrink-0 bg-uisky-400">
                                      <i className="pi pi-user text-uiyellow-300"></i>
                                    </span>
                                    <InputText
                                      id="studentNumber"
                                      className="p-2 flex-grow w-full"
                                      placeholder="Student Number"
                                      onChange={(e) =>
                                        setStudentNo(e.target.value)
                                      }
                                    />
                                  </div>
                                </div>
                                {filterParam === 2 && (
                                  <div className="flex flex-column gap-2">
                                    <label
                                      htmlFor="nin"
                                      className="text-uiblue-400"
                                    >
                                      NIN
                                    </label>
                                    <div className="p-inputgroup flex ring-1 ring-uisky-200 rounded-md w-full">
                                      <span className="p-inputgroup-addon flex-shrink-0 bg-uisky-400">
                                        <i className="pi pi-id-card text-uiyellow-300"></i>
                                      </span>
                                      <InputText
                                        id="nin"
                                        className="p-2 flex-grow w-full"
                                        placeholder="NIN"
                                        onChange={(e) => setNin(e.target.value)}
                                      />
                                    </div>
                                  </div>
                                )}
                                {filterParam === 1 && (
                                  <div className="flex flex-column gap-2">
                                    <label
                                      htmlFor="yearOfGrad"
                                      className="text-uiblue-400"
                                    >
                                      Year of Graduation
                                    </label>
                                    <Calendar
                                      className="w-full date-search-input bg-[#5a5a95] text-white border border-[#5a5a95]"
                                      required
                                      value={year}
                                      onChange={(e) => setYear(e.value)}
                                      view="year"
                                      showIcon
                                      dateFormat="yy"
                                    />
                                  </div>
                                )}
                              </form>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => setActiveViewState(0)}
                                  className="rounded-md ring-1 ring-uiyellow-500 w-32 bg-uiblue-500 text-white p-2"
                                >
                                  Previous
                                </button>
                                <Button
                                  label="Search"
                                  icon="pi pi-fw pi-search"
                                  loading={loading}
                                  onClick={searchData}
                                  className="rounded-md ring-1 ring-uiblue-500 w-32 bg-uiyellow-500 text-white p-2"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="w-full md:w-1/2">
                          <div className="text-uiyellow-500 mx-auto max-w-sm">
                            <Image
                              src="/educhain_3.png"
                              alt="Logo"
                              width={350}
                              height={350}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        )}
        {record !== null && (
          <div className="mx-auto w-full max-w-6xl">
            <div className="card ring-2 ring-uiyellow-700 py-2 px-3 bg-uimuted-200">
              <div className="flex flex-row items-center justify-between mb-2">
                <div>
                  <Image
                    src={`${record.school?.logoUrl}`}
                    alt="School Logo"
                    width={70}
                    height={70}
                  />
                </div>
                <div className="flex">
                  <DownloadPDFButton
                    studentNo={studentNo}
                    year={parsedYear}
                    nin={nin}
                  />
                  <Button
                    label="Close"
                    outlined
                    onClick={closeResultDialog}
                    className="ring-1 ring-uiblue-500 text-uiblue-500 ml-2 py-1"
                  />
                </div>
              </div>
              <ResultViewPage record={record} />
            </div>
          </div>
        )}
        <div className="bg-uimuted-200/20 absolute -start-6 -top-6 h-14 w-0 origin-top-left rotate-45 rounded-full transition-all delay-[25ms] duration-300 w-72"></div>
        <div className="bg-uimuted-200/20 absolute -top-12 start-20 h-14 w-0 origin-top-left rotate-45 rounded-full transition-all delay-75 duration-300 w-48"></div>
        <div className="bg-uimuted-200/20 absolute -start-7 top-24 h-14 w-0 origin-top-left rotate-45 rounded-full transition-all delay-150 duration-300 w-40"></div>
        <div className="bg-uimuted-200/20 absolute -bottom-6 -end-6 h-14 w-0 origin-bottom-right rotate-45 rounded-full transition-all delay-150 duration-300 w-72"></div>
        <div className="bg-uimuted-200/20 absolute -bottom-12 end-20 h-14 w-0 origin-bottom-right rotate-45 rounded-full transition-all delay-75 duration-300 w-48"></div>
        <div className="bg-uimuted-200/20 absolute -end-7 bottom-24 h-14 w-0 origin-bottom-right rotate-45 rounded-full transition-all delay-[25ms] duration-300 w-40"></div>
      </div>

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
    </div>
  );
};

export default ResultCheckPage;
