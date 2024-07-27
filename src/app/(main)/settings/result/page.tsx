"use client";

import React, { useState } from "react";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";

const ResultSetting = () => {
  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="my-2">
          <Button
            label="Upload"
            icon="pi pi-upload"
            severity="success"
            className=" mr-2"
          />
          <Button
            label="Download Template"
            icon="pi pi-download"
            severity="help"
            outlined
          />
        </div>
      </React.Fragment>
    );
  };
  return (
    <>
      
    </>
  );
};

export default ResultSetting;
