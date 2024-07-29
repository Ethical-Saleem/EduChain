import React, { useState } from "react";

const ResultViewPage = ({ record }: any) => {
  return (
    <div className="relative rounded-md">
      <div className="absolute for-bg-main h-full inset-0 bg-uisky-100 flex items-center justify-center w-full">
        <div
          className="bg-center bg-no-repeat bg-cover"
          style={{
            width: "450px",
            height: "450px",
            opacity: 0.2,
            backgroundImage: "url(/educhain_3.png)",
          }}
        ></div>
      </div>
      <div className="relative">
        <div className="relative personal border mb-2 p-2">
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
        <div className="relative school border mb-2 p-2">
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
                {record.school?.telephone ? record.school?.telephone : "-"}
              </p>
            </div>
          </div>
          <div className="custom-grid md:grid-cols-2 xl:grid-cols-3 gap-4 px-3 mt-4">
            <div className="col-span-3 md:col-span-1">
              <span className="text-sm">Degree:</span>
              <p className="font-bold">{record.degree ? record.degree : "-"}</p>
            </div>
            <div className="col-span-3 md:col-span-1">
              <span className="text-sm">Grade:</span>
              <p className="font-bold">{record.grade ? record.grade : "-"}</p>
            </div>
            <div className="col-span-3 md:col-span-1">
              <span className="text-sm">Year of Graduation:</span>
              <p className="font-bold">
                {record.yearOfGrad ? record.yearOfGrad : "-"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultViewPage;
