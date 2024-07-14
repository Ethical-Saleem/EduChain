import { config } from "../config";
import requestOptions from "../helpers/RequestOptions";
import handleResponse from "../helpers/HandleResponses";
import handleBlobResponse from "../helpers/HandleBlobResponses";
import { Demo } from "../../../types";
import { Nullable } from "primereact/ts-helpers";

async function uploadResults(id: number | undefined, file: File) {
  const formData = new FormData();
  formData.append("File", file);
  const response = await fetch(
    `${config.apiUrl}/Result/UploadResultRecords/${id}`,
    await requestOptions.postForm(formData)
  );

  const model = await handleResponse(response);

  return model;
}

async function downloadTemplate() {
  const response = await fetch(
    `${config.apiUrl}/Result/DownloadResultTemplate`,
    await requestOptions.get()
  );

  const model = await handleBlobResponse(response);

  return model;
}

async function dispatchFetchResults(schoolId: number | undefined) {
  const response = await fetch(
    `${config.apiUrl}/Result/All/${schoolId}`,
    await requestOptions.get()
  );
  console.log('test-response', response);
  const model = await handleResponse(response);
  return model;
}

async function dispatchFetchResult(id: number | undefined) {
  const response = await fetch(
    `${config.apiUrl}/Result/${id}`,
    await requestOptions.get()
  );
  const model = await handleResponse(response);
  return model;
}

async function dispatchUpdateRecord(data: Demo.Result) {
  const response = await fetch(
    `${config.apiUrl}/School/UpdateResultRecord`,
    await requestOptions.put(data)
  );
  const model = await handleResponse(response);
  return model;
}

async function dispatchRemoveRecord(id: number) {
  const response = await fetch(
    `${config.apiUrl}/School/RemoveResultRecord/${id}`,
    await requestOptions.delete()
  );
  const model = await handleResponse(response);
  return model;
}

async function dispatchFetchStudentResultRecord(studentNo: string, year: string) {
  const response = await fetch(
    `${config.apiUrl}/Result/ResultRecordByStudent?StudentNumber=${studentNo}&Year=${year}`,
    await requestOptions.get()
  );
  const model = await handleResponse(response);
  return model;
}

export const SchoolService = {
  uploadResults,
  downloadTemplate,
  dispatchFetchResults,
  dispatchFetchResult,
  dispatchUpdateRecord,
  dispatchRemoveRecord,
  dispatchFetchStudentResultRecord
};
