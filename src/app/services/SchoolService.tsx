import { config } from "../config";
import requestOptions from "../helpers/RequestOptions";
import handleResponse from "../helpers/HandleResponses";
import handleBlobResponse from "../helpers/HandleBlobResponses";
import { Demo } from "../../../types";
import { Nullable } from "primereact/ts-helpers";
import api from "../api/api";

async function uploadResults(id: number | undefined, file: File) {
  const formData = new FormData();
  formData.append("File", file);
  const response = await api.postForm(`/Result/UploadResultRecords/${id}`, formData);

  const model = response.data;

  return model;
}

async function downloadTemplate() {
  const response = await api.get(`/Result/DownloadResultTemplate`, { responseType: 'blob' });

  const model = response;

  return model;
}

async function dispatchFetchResults(schoolId: number | undefined) {
  const response = await api.get(`/Result/All/${schoolId}`);
  console.log('test-response', response);
  const model = response.data;
  return model;
}

async function dispatchFetchResult(id: number | undefined) {
  const response = await api.get(`/Result/${id}`)
  const model = response.data;
  return model;
}

async function dispatchUpdateRecord(data: Demo.Result) {
  const response = await api.put(`/Result/${data.id}`, data);
  const model = response.data;
  return model;
}

async function dispatchRemoveRecord(id: number) {
  const response = await api.delete(`/Result/${id}`);
  const model = response.data;
  return model;
}

async function dispatchFetchStudentResultRecord(studentNo: string, year: string) {
  const response = await api.get(`/Result/ResultRecordByStudent?studentNumber=${studentNo}&year=${year}`);
  const model = response.data;
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
