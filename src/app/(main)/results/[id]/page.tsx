"use client";

import React, { useState, useEffect } from "react";
import { Demo } from "../../../../../types";
import { SchoolService } from "@/app/services/SchoolService";
import { ProgressBar } from "primereact/progressbar";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

import { inter } from "@/app/ui/fonts";
import { InputText } from "primereact/inputtext";

const ResultRecord = ({ params }: { params: { id: number } }) => {
  const router = useRouter();

  const [record, setRecord] = useState({} as Demo.Result);
  const [fetching, setFetching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recordDialog, setRecordDialog] = useState(false);

  useEffect(() => {
    fetchData();
  }, [params.id]);

  const fetchData = async () => {
    setFetching(true);

    try {
      const result = await SchoolService.dispatchFetchResult(params.id);
      if (result) {
        setFetching(false);
        setRecord(result);
      }
    } catch (error: any) {
      console.log("fetch-error", error);
      setFetching(false);
      toast.error(`Error: ${error}`);
    }
  };

  const openRecordDialog = () => {
    setRecordDialog(true);
  };
  const closeRecordDialog = () => {
    setRecordDialog(false);
  };

  const formatYear = (date: Date) => {
    const d = new Date(date);
    return d.getFullYear();
  };

  const convertToISO = (date: Date | null | undefined): string => {
    if (!date) {
      throw new Error("Invalid Date");
    }

    return date.toLocaleDateString();
  };

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: string
  ) => {
    const val = (e.target && e.target.value) || "";
    let _data = { ...record };
    _data[`${name}`] = val;

    setRecord(_data);
  };

  const onDateChange = (e: { value: Date | null | undefined }) => {
    console.log("date", e.value);
    setRecord((prevData) => ({
      ...prevData,
      yearOfGrad: e.value,
    }));
  };

  const updateData = async () => {
    setLoading(true);

    try {
        // record.yearOfGrad = convertToISO(record.yearOfGrad)
      const result = await SchoolService.dispatchUpdateRecord(record);
      if (result) {
        setLoading(false);
        toast.success("Record update successfully");
        closeRecordDialog();
        fetchData();
      }
    } catch (error: any) {
      console.log("update-error", error);
      toast.error(`Error: ${error}`);
      setLoading(false);
    }
  };

  const LeftToolbarTemplate = () => {
    return (
      <>
        <div className="flex items-center">
          <Button
            icon="pi pi-arrow-left"
            text
            className="text-2xl mr-2"
            onClick={() => router.back()}
          />
          <h5 className={`${inter.className} text-2xl m-0`}>Result Record</h5>
        </div>
      </>
    );
  };

  const RightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="my-2">
          <Button
            label="Update Record"
            icon="pi pi-replay"
            severity="help"
            outlined
            onClick={openRecordDialog}
            disabled={!record}
          />
        </div>
      </React.Fragment>
    );
  };

  const RecordDialogFooter = () => {
    return (
      <div className="my-2">
        <Button
          label="Save"
          icon="pi pi-save"
          severity="help"
          className=""
          loading={loading}
          onClick={updateData}
        />
        <Button
          label="Cancel"
          icon="pi pi-times"
          severity="danger"
          text
          className=""
          onClick={closeRecordDialog}
        />
      </div>
    );
  };

  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <ToastContainer />
          {fetching ? (
            <ProgressBar
              mode="indeterminate"
              style={{ height: "6px" }}
            ></ProgressBar>
          ) : (
            <div className="">
              <Toolbar
                className="mb-4"
                start={LeftToolbarTemplate}
                end={RightToolbarTemplate}
              />
              <div className="personal border mb-2 p-2">
                <h6 className="">Personal Details</h6>
                <div className="custom-grid md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-2 p-3">
                  <div className="col-span-3 md:col-span-1">
                    <span className="text-sm">Surname:</span>
                    <p className="font-bold uppercase">
                      {record.surname ? record.surname : "-"}
                    </p>
                  </div>
                  <div className="col-span-3 md:col-span-1">
                    <span className="text-sm">Other Names:</span>
                    <p className="font-bold">
                      {record.otherNames ? record.otherNames : "-"}
                    </p>
                  </div>
                  <div className="col-span-3 md:col-span-1">
                    <span className="text-sm">Student No.:</span>
                    <p className="font-bold">{record.studentNumber}</p>
                  </div>
                  <div className="col-span-3 md:col-span-1">
                    <span className="text-sm">Email:</span>
                    <p className="font-bold">
                      {record.email ? record.email : "-"}
                    </p>
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
                    <p className="font-bold">
                      {record.city ? record.city : "-"}
                    </p>
                  </div>
                  <div className="col-span-3 md:col-span-1">
                    <span className="text-sm">State:</span>
                    <p className="font-bold">
                      {record.state ? record.state : "-"}
                    </p>
                  </div>
                  <div className="col-span-3 md:col-span-1">
                    <span className="text-sm">Country:</span>
                    <p className="font-bold">
                      {record.country ? record.country : "-"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="school border mb-2 p-2">
                <h6 className="">School Details</h6>
                <div className="custom-grid md:grid-cols-3 xl:grid-cols-4 p-3">
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
                      {record.school?.telephone
                        ? record.school?.telephone
                        : "-"}
                    </p>
                  </div>
                </div>
                <div className="custom-grid md:grid-cols-2 xl:grid-cols-3 gap-4 px-3 mt-4">
                  <div className="col-span-3 md:col-span-1">
                    <span className="text-sm">Degree:</span>
                    <p className="font-bold">
                      {record.degree ? record.degree : "-"}
                    </p>
                  </div>
                  <div className="col-span-3 md:col-span-1">
                    <span className="text-sm">Grade:</span>
                    <p className="font-bold">
                      {record.grade ? record.grade : "-"}
                    </p>
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
          )}

          <Dialog
            visible={recordDialog}
            style={{ width: "450px" }}
            modal
            header="Update Record"
            footer={RecordDialogFooter}
            onHide={closeRecordDialog}
          >
            <div className="">
              <div className="field">
                <label htmlFor="degree" className="block text-900">
                  Degree
                </label>
                <InputText
                  id="degree"
                  value={record.degree}
                  className="w-full"
                  onChange={(e) => onInputChange(e, "degree")}
                />
              </div>
              <div className="field">
                <label htmlFor="grade" className="block text-900">
                  Grade
                </label>
                <InputText
                  id="grade"
                  value={record.grade}
                  className="w-full"
                  onChange={(e) => onInputChange(e, "grade")}
                />
              </div>
              <div className="field">
                <label htmlFor="year" className="block text-900">
                  Year of Graduation
                </label>
                <Calendar
                  className="w-full date-search-input"
                  required
                  value={record.yearOfGrad}
                  onChange={(e) => onDateChange(e)}
                  dateFormat="yy"
                  view="year"
                />
              </div>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default ResultRecord;
