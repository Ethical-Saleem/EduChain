"use client";

import React, { useState, useEffect, useRef } from "react";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import {
  FileUpload,
  FileUploadHeaderTemplateOptions,
  FileUploadSelectEvent,
  FileUploadHandlerEvent,
  ItemTemplateOptions,
} from "primereact/fileupload";
import { ProgressBar } from "primereact/progressbar";
import { Tooltip } from "primereact/tooltip";
import { Tag } from "primereact/tag";
import { AuthenticationService } from "@/app/services/AuthenticationService";
import { SchoolService } from "../../services/SchoolService";
import { Demo } from "../../../../types";
import { Column } from "primereact/column";
import { lusitana } from "@/app/ui/fonts";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { getCookie } from "@/app/utils/cookies";
import { withAuth } from "@/app/hoc/WithAuth";
import Loading from "../loading";

interface UploadError {
  row: number;
  error: string;
}

const Results = () => {
  const toastPrime = useRef<Toast>(null);
  const [results, setResults] = useState([] as Demo.Result[]);
  const [resultRecord, setResult] = useState({} as Demo.Result);
  const [selectedResults, setSelectedResults] = useState([]);
  const [uploadErrors, setUploadErrors] = useState([] as UploadError[]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [importDialog, setImportDialog] = useState(false);
  const [downloadDialog, setDownloadDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [errorDialog, setErrorDialog] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const dt = useRef<DataTable<any>>(null);
  const [currentUser, setCurrentUser] = useState<Demo.TokenModel | null>(null);

  useEffect(() => {
    const user = getCookie("currentUser");
    if (user) {
      const parsedUser = JSON.parse(user);
      if (parsedUser) {
        setCurrentUser(parsedUser);
        fetchRecords(parsedUser?.school.id);
      }
    }
  }, []);

  const fetchRecords = async (id: number | undefined) => {
    setFetching(true);
    await SchoolService.dispatchFetchResults(id).then(
      (data) => {
        setResults(data);
        setFetching(false);
      },
      (error: any) => {
        setFetching(false);
        if (error.response) {
          toast.error(`Error: ${error.response.data.message}`)
        } else if (error.message) {
          toast.error(`Error: ${error.message}`)
        } else {
          toast.error(`Error: ${error}`)
        }
      }
    );
  };

  const downloadTemplate = async () => {
    setDownloading(true);
    try {
      const result = await SchoolService.downloadTemplate();

      if (result) {
        console.log("result", result);
        const blob = new Blob([result.data], {
          type: (result.data as Blob).type,
        });

        const downloadElement = document.createElement("a");
        const href = window.URL.createObjectURL(blob);
        downloadElement.href = href;
        downloadElement.download = "ResultUploadTemplate.xlsx";
        document.body.appendChild(downloadElement);
        downloadElement.click();
        document.body.removeChild(downloadElement);
        window.URL.revokeObjectURL(href);
      }
      setDownloading(false);
      setDownloadDialog(false);
    } catch (error: any) {
      setDownloading(false);
      if (error.response) {
        toast.error(`Error: ${error.response.data.message}`)
      } else if (error.message) {
        toast.error(`Error: ${error.message}`)
      } else {
        toast.error(`Error: ${error}`)
      }
    }
  };

  const dispatchDeleteRecord = async () => {
    setLoading(true);
    try {
      const result = await SchoolService.dispatchRemoveRecord(resultRecord.id);
      if (result) {
        setLoading(false);
        toast.success(
          `Result record for ${resultRecord.studentNumber} deleted successfully`
        );
        fetchRecords(currentUser?.school.id);
        setDeleteDialog(false);
      }
    } catch (error: any) {
      setLoading(false);
      console.log("delete-error", error);
      if (error.response) {
        toast.error(`Error: ${error.response.data.message}`)
      } else if (error.message) {
        toast.error(`Error: ${error.message}`)
      } else {
        toast.error(`Error: ${error}`)
      }
    }
  };

  const openImportDialog = () => {
    setImportDialog(true);
  };
  const closeImportDialog = () => {
    setImportDialog(false);
  };

  const openDownloadDialog = () => {
    setDownloadDialog(true);
  };
  const closeDownloadDialog = () => {
    setDownloadDialog(false);
  };

  const openDeleteDialog = (data: Demo.Result) => {
    setDeleteDialog(true);
    setResult(data);
  };
  const closeDeleteDialog = () => {
    setDeleteDialog(false);
  };

  const openErrorDialog = (data: any) => {
    setUploadErrors(data);
    setErrorDialog(true);
  };
  const closeErrorDialog = () => {
    setErrorDialog(false);
    setUploadErrors([] as UploadError[]);
  };

  const formatYear = (date: Date) => {
    const d = new Date(date);
    return d.getFullYear();
  };

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="my-2">
          <Button
            label="Upload"
            icon="pi pi-upload"
            severity="success"
            onClick={openImportDialog}
            className=" mr-2"
          />
          <Button
            label="Download Template"
            icon="pi pi-download"
            severity="help"
            onClick={openDownloadDialog}
            outlined
          />
        </div>
      </React.Fragment>
    );
  };

  const ImportDialogFooter = () => {
    return (
      <>
        <Button
          label="Cancel"
          icon="pi pi-times"
          text
          onClick={closeImportDialog}
        />
      </>
    );
  };

  const DeleteDialogFooter = () => {
    return (
      <>
        <Button
          label="No"
          icon="pi pi-times"
          text
          onClick={closeDeleteDialog}
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          text
          onClick={dispatchDeleteRecord}
        />
      </>
    );
  };

  const ErrorDialogFooter = () => {
    return (
      <>
        <Button
          label="Dismiss"
          icon="pi pi-times"
          text
          severity="danger"
          onClick={closeErrorDialog}
        />
      </>
    );
  };

  const UploadTemplate = () => {
    const [totalSize, setTotalSize] = useState(0);
    const fileUploadRef = useRef<FileUpload>(null);

    const onTemplateSelect = (e: FileUploadSelectEvent) => {
      let _totalSize = totalSize;
      let files = e.files;

      for (let i = 0; i < files.length; i++) {
        _totalSize += files[i].size || 0;
      }

      setTotalSize(_totalSize);
    };

    const onTemplateUpload = async (event: FileUploadHandlerEvent) => {
      const file = event.files[0];
      console.log("file", file);

      SchoolService.uploadResults(currentUser?.school.id, file).then(
        (res) => {
          console.log(res);
          if (res.data.length > 0) {
            toast.success(`${res.data.length} records uploaded successfully`, {
              position: "top-right",
            });
            fetchRecords(currentUser?.school.id);
            closeImportDialog();
            onTemplateClear();
          } else {
            toast.warning("0 records uploaded");
          }
        },
        (error) => {
          console.log(error);
          if (error.response) {
            if (error.response.data.errors) {
              console.log(error.response.data.errors);
              openErrorDialog(error.response.data.errors);
            } else {
              toast.error(`${error.response.data.message}`);
            }
          } else if (error.message) {
            toast.error(`Error: ${error.message}`)
          } else {
            toast.error(`Error: ${error}`)
          }
        }
      );
    };

    const onTemplateRemove = (file: File, callback: Function) => {
      setTotalSize(totalSize - file.size);
      callback();
    };

    const onTemplateClear = () => {
      setTotalSize(0);
    };

    const headerTemplate = (options: FileUploadHeaderTemplateOptions) => {
      const { className, chooseButton, uploadButton, cancelButton } = options;
      const value = totalSize / 10000;

      return (
        <div
          className={className}
          style={{
            backgroundColor: "transparent",
            display: "flex",
            alignItems: "center",
          }}
        >
          {chooseButton}
          {uploadButton}
          {cancelButton}
        </div>
      );
    };

    const itemTemplate = (inFile: object, props: ItemTemplateOptions) => {
      const file = inFile as File;
      return (
        <div className="flex align-items-center flex-wrap">
          <div className="flex align-items-center" style={{ width: "40%" }}>
            <span className="flex flex-column text-left ml-3">
              {file.name}
              <small>{new Date().toLocaleDateString()}</small>
            </span>
          </div>
          <Tag
            value={props.formatSize}
            severity="warning"
            className="px-3 py-2"
          />
          <Button
            type="button"
            icon="pi pi-times"
            className="p-button-outlined p-button-rounded p-button-danger ml-auto"
            onClick={() => onTemplateRemove(file, props.onRemove)}
          />
        </div>
      );
    };

    const emptyTemplate = () => {
      return (
        <div className="flex align-items-center flex-column">
          <i
            className="pi pi-file-excel mt-3 p-5"
            style={{
              fontSize: "5em",
              borderRadius: "50%",
              backgroundColor: "var(--surface-b)",
              color: "var(--surface-d)",
            }}
          ></i>
          <span
            style={{ fontSize: "1.2em", color: "var(--text-color-secondary)" }}
            className="my-2"
          >
            Drag and Drop File Here
          </span>
          <span
            style={{ fontSize: "0.8rem", color: "var(--text-color-secondary)" }}
          >
            Only file ending with .xlsx or .xls is accepted
          </span>
        </div>
      );
    };

    const chooseOptions = {
      icon: "pi pi-fw pi-images",
      iconOnly: true,
      className: "custom-choose-btn p-button-rounded p-button-outlined",
    };
    const uploadOptions = {
      icon: "pi pi-fw pi-cloud-upload",
      iconOnly: true,
      className:
        "custom-upload-btn p-button-success p-button-rounded p-button-outlined",
    };
    const cancelOptions = {
      icon: "pi pi-fw pi-times",
      iconOnly: true,
      className:
        "custom-cancel-btn p-button-danger p-button-rounded p-button-outlined",
    };
    return (
      <div>
        <Tooltip
          target=".custom-choose-btn"
          content="Choose"
          position="bottom"
        />
        <Tooltip
          target=".custom-upload-btn"
          content="Upload"
          position="bottom"
        />
        <Tooltip
          target=".custom-cancel-btn"
          content="Clear"
          position="bottom"
        />

        <FileUpload
          ref={fileUploadRef}
          name="File"
          customUpload
          accept=".xls, .xlsx"
          maxFileSize={1000000}
          uploadHandler={onTemplateUpload}
          onSelect={onTemplateSelect}
          onError={onTemplateClear}
          onClear={onTemplateClear}
          headerTemplate={headerTemplate}
          itemTemplate={itemTemplate}
          emptyTemplate={emptyTemplate}
          chooseOptions={chooseOptions}
          uploadOptions={uploadOptions}
          cancelOptions={cancelOptions}
        />
      </div>
    );
  };

  const studentNumberTemplate = (rowData: Demo.Result) => {
    return (
      <>
        <span className="p-column-title">Student Number</span>
        <Link href={`/results/${rowData.id}`} className="uppercase">
          {rowData.studentNumber}
        </Link>
      </>
    );
  };

  const SurnameBodyTemplate = (rowData: Demo.Result) => {
    return (
      <>
        <span className="p-column-title">Surname</span>
        <span className="uppercase">{rowData.surname}</span>
      </>
    );
  };

  const YearOfGradTemplate = (rowData: Demo.Result) => {
    return (
      <>
        <span className="p-column-title">Year of Graduation</span>
        {rowData.yearOfGrad ? formatYear(rowData.yearOfGrad) : "N/A"}
      </>
    );
  };

  const tableActionsTemplate = (rowData: Demo.Result) => {
    return (
      <>
        <Button
          icon="pi pi-trash"
          rounded
          text
          severity="danger"
          onClick={() => openDeleteDialog(rowData)}
        />
      </>
    );
  };

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">Manage Result Records</h5>

      <span className="block mt-2 md:mt-0 p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.currentTarget.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );

  return (
    <>
      {fetching && <Loading />}
      {!fetching && (<div className="grid">
        <div className="col-12">
          <div className="card bg-gray-200 text-gray-700">
            <Toast />
            <ToastContainer />
            <Toolbar className="mb-4" end={rightToolbarTemplate} />
            <DataTable
              ref={dt}
              value={results}
              selection={selectedResults}
              onSelectionChange={(e) => setSelectedResults(e.value as any)}
              dataKey="id"
              paginator
              rows={10}
              rowsPerPageOptions={[5, 10, 25]}
              className="datatable-responsive"
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Records"
              globalFilter={globalFilter}
              emptyMessage="No records found."
              header={header}
              loading={fetching}
              responsiveLayout="scroll"
            >
              <Column
                selectionMode="multiple"
                headerStyle={{ width: "4rem" }}
              ></Column>
              <Column
                field="studentNumber"
                sortable
                header="STUDENT NUNMBER"
                body={studentNumberTemplate}
                headerStyle={{ minWidth: "15rem" }}
              ></Column>
              <Column
                field="surname"
                sortable
                header="SURNAME"
                body={SurnameBodyTemplate}
                headerStyle={{ minWidth: "15rem" }}
              ></Column>
              <Column
                field="otherNames"
                sortable
                header="OTHER NAMES"
                headerStyle={{ minWidth: "15rem" }}
              ></Column>
              <Column
                field="email"
                sortable
                header="EMAIL"
                headerStyle={{ minWidth: "15rem" }}
              ></Column>
              <Column
                field="phoneNumberOne"
                sortable
                header="PHONE NUMBER"
                headerStyle={{ minWidth: "15rem" }}
              ></Column>
              <Column
                field="grade"
                sortable
                header="GRADE"
                headerStyle={{ minWidth: "15rem" }}
              ></Column>
              <Column
                field="yearOfGrad"
                sortable
                header="YEAR OF GRADUATION"
                body={YearOfGradTemplate}
                headerStyle={{ minWidth: "15rem" }}
              ></Column>
              <Column
                headerStyle={{ minWidth: "15rem" }}
                body={tableActionsTemplate}
              />
            </DataTable>

            <Dialog
              visible={downloadDialog}
              style={{ width: "450px" }}
              header="Result Upload Template"
              modal
              className="p-fluid"
              onHide={closeDownloadDialog}
            >
              <div className="">
                <p className={`${lusitana.className}`}>
                  Download the upload template and fill in the respective fields
                </p>
                <Button
                  label="Download"
                  className="w-full"
                  severity="success"
                  loading={downloading}
                  onClick={downloadTemplate}
                />
              </div>
            </Dialog>

            <Dialog
              visible={importDialog}
              style={{ width: "700px" }}
              header="Result Upload"
              modal
              className="p-fluid"
              footer={ImportDialogFooter}
              onHide={closeImportDialog}
            >
              <div className="">
                <UploadTemplate />
              </div>
            </Dialog>

            <Dialog
              visible={deleteDialog}
              style={{ width: "450px" }}
              header="Confirm"
              modal
              footer={DeleteDialogFooter}
              onHide={closeDeleteDialog}
            >
              <div className="flex align-items-center justify-content-center">
                <i
                  className="pi pi-exclamation-triangle mr-3"
                  style={{ fontSize: "2rem" }}
                />
                {resultRecord && (
                  <span>
                    Are you sure you want to delete{" "}
                    <b>{resultRecord.studentNumber}</b>?
                  </span>
                )}
              </div>
            </Dialog>

            <Dialog
              visible={errorDialog}
              style={{ width: "450px" }}
              header="Upload Error(s)"
              modal
              footer={ErrorDialogFooter}
              onHide={closeErrorDialog}
            >
              <div className="">
                <p className="text-red-400">The following error(s) occured while validating the uploaded document:</p>
                <ul className="unstyled">
                  {uploadErrors.map((i, key) => (
                    <li className="flex mb-2" key={key}>
                      <span className="text-base">{`Row ${i.row}:`}</span>
                      <span className="text-rose-400 font-bold ml-3">{i.error}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Dialog>
          </div>
        </div>
      </div>)}
    </>
  );
};

export default withAuth(Results);
