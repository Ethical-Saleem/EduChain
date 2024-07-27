import { config } from "../config";
import requestOptions from "../helpers/RequestOptions";
import handleResponse from "../helpers/HandleResponses";
import api from "../api/api";
import { Demo } from "../../../types";

async function fetchUsers(schoolId: number | undefined) {
  const response = await api.get(`/User/All/${schoolId}`);
  const model = response.data;
  return model;
}

async function updateUser(id: number | undefined, input: Demo.User) {
  const response = await api.put(`/User/${id}`, input);
  const model = response.data;
  return model;
}

async function deleteUser(id: number | undefined) {
  const response = await api.delete(`/User/${id}`);
  const model = response.data;
  return model;
}

async function fetchRoles() {
  const response = await api.get<Demo.Role[]>('/User/Role/All');
  const model = response.data;
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

async function addUserToRole(roleId: string, userId: string | undefined) {
  const response = await api.post('/User/Role/AssignRole', { roleId, userId });
  const model = response.data;
  return model;
}

async function removeFromRole(roleId: string, userId: string) {
  const response = await api.post(`/User/Role/RemoveFromRole?userId=${userId}&roleId=${roleId}`)
  const model = response.data;
  return model;
}

async function changePassword(input: Demo.ChangePasswordModel) {
  const response = await api.post(`/auth/change-password`, input);
  const model = response.data;
  return model;
}

export const AccountService = {
  fetchUsers,
  updateUser,
  deleteUser,
  fetchRoles,
  addRole,
  addUserToRole,
  removeFromRole,
  changePassword,
};
