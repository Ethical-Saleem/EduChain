import { config } from "../config";
import requestOptions from "../helpers/RequestOptions";
import handleResponse from "../helpers/HandleResponses";
import { request } from "http";

async function fetchRoles(schoolId: number) {
  const response = await fetch(
    `${config.apiUrl}/Account/GetRoles?Id=${schoolId}`,
    requestOptions.get()
  );
  const model = await handleResponse(response);
  return model;
}

async function addRole(schoolId: number, role: string) {
  const response = await fetch(
    `${config.apiUrl}/Account/AddRole/${schoolId}?roleName=${role}`,
    requestOptions.post({})
  );
  const model = await handleResponse(response);
  return model;
}

async function addUserToRole(schoolId: number, userId: string, role: string) {
  const response = await fetch(
    `${config.apiUrl}/Account/AddUserToRole/${schoolId}?userId=${userId}&roleName=${role}`,
    requestOptions.post({})
  );
  const model = await handleResponse(response);
  return model;
}

async function removeFromRole(schoolId: number, user: string, role: string) {
  const response = await fetch(
    `${config.apiUrl}/Account/RemoveFromRole/${schoolId}?email=${user}&roleName=${role}`,
    requestOptions.post({})
  );
  const model = await handleResponse(response);
  return model;
}

export const AccountService = {
  fetchRoles,
  addRole,
  addUserToRole,
  removeFromRole,
};
