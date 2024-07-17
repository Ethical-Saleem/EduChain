import React, { useState, useEffect, useRef } from "react";
import { PDFDownloadLink, pdf } from "@react-pdf/renderer";
import ResultDocument from "./PDFDownload";
import ResultDocumentTwo from "./PDFDownloadTwo";
import { SchoolService } from "@/app/services/SchoolService";
import { Demo } from "../../types";
import { Button } from "primereact/button";

interface DownloadSearchParams {
  studentNo: string;
  year: string;
}

const DownloadPDFButton: React.FC<DownloadSearchParams> = ({
  studentNo,
  year,
}) => {
  const [record, setRecord] = useState<Demo.Result | null>(null);
  const [loading, setLoading] = useState(false);
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await SchoolService.dispatchFetchStudentResultRecord(
        studentNo,
        year
      );
      if (response) {
        setRecord(response);
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
      console.log("download-error", error);
    }
  };

  useEffect(() => {
    const downloadPdf = async () => {
      if (record) {
        const doc = <ResultDocument record={record} />;
        const blob = await pdf(doc).toBlob();
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `${record.surname}-Result-Record.pdf`;
        a.click();
        URL.revokeObjectURL(url);
      }
    };

    if (record && downloadLinkRef.current) {
      downloadPdf();
    }
  }, [record]);

  return (
    <div className="">
      <Button
        label="Download"
        icon="pi pi-save"
        className="search-button bg-[#5a5a95]"
        onClick={fetchData}
        loading={loading}
      />

      {record && (
        <a ref={downloadLinkRef} href="#" style={{ display: "none" }}>
          Trigger PDF Download
        </a>
      )}
    </div>
  );
};

export default DownloadPDFButton;
