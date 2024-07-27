import { setCookie, getCookie, removeCookie } from "../utils/cookies";
import { BehaviorSubject } from "rxjs";
import Cookies from "js-cookie";
import { config } from "../config";
import requestOptions from "../helpers/RequestOptions";
import handleResponse from "../helpers/HandleResponses";
import api from "../api/api";

import { Demo } from "../../../types";

const getCurrentUser = () => {
    const user = Cookies.get("currentUser");
    return user ? JSON.parse(user) : null;
};
const currentUserSubject = new BehaviorSubject<Demo.TokenModel | null>(getCurrentUser());

async function login(email: string, password: string): Promise<any> {
  const response = await api.post<Demo.TokenModel>('/auth/login', { email, password });
  const model = response.data;

  Cookies.set("currentUser", JSON.stringify(model));
  currentUserSubject.next(model);

  return model;
}

async function register(input: Demo.NewSchool) {
  const formData = new FormData();
  Object.entries(input).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (value instanceof Date) {
        formData.append(key, value.toISOString());
      } else if (typeof value === "number") {
        formData.append(key, value.toString());
      } else if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, value.toString());
      }
    }
  });
  const response = await api.post('/School', formData);
  const model = response.data;

  return model
}

async function registerUser(input: Demo.NewUser) {
  const response = await api.post<Demo.User>('/User', input);
  const model = response.data;

  return model;
}

async function refreshToken(): Promise<Demo.TokenModel> {
  const currentUser = currentUserSubject.value;
  if (!currentUser) {
    throw new Error('No current user');
  }

  const response = await api.post<Demo.TokenModel>('/auth/refresh-token', { refreshToken: currentUser.refreshToken });
  console.log('currentUser-refresh', currentUser);
  const model = response.data;

  Cookies.set("currentUser", JSON.stringify(model));
  currentUserSubject.next(model);

  return model;
}

async function sendVerificationMail(email: string) {
  const response = await api.post('/auth/send-verification-email', { email });
  const model = response.data;
  return model;
}

async function resendVerificationMail(email: string) {
  const response = await api.post(`/auth/resend-verification-email`, { email });
  const model = response.data;
  return model;
}

async function verifyEmail(email: string, code: string | number | null | undefined) {
  const response = await api.post('/auth/verify-email', { email, code});
  const model = response.data;
  return model;
}

async function forgotPassword(email: string) {
  const response = await api.post(`/auth/forgot-password`, { email });
  const model = response.data;
  return model;
}

async function resetPassword(input: Demo.ResetPassword) {
  const response = await api.post(`/auth/reset-password`, input);
  const model = response.data;
  return model;
}

async function requestResetPassword(email: string) {
  const response = await api.post(`/auth/request-reset-password`, { email });
  const model = response.data;
  return model;
}

async function resetPasswordByToken(input: Demo.TokenResetPassword) {
  const response = await api.post(`/auth/reset-password-by-token`, input);
  const model = response.data;
  return model;
}

async function logout() {
  Cookies.remove("currentUser");
  currentUserSubject.next(null);
}

export const AuthenticationService = {
  login,
  logout,
  register,
  registerUser,
  refreshToken,
  sendVerificationMail,
  resendVerificationMail,
  verifyEmail,
  forgotPassword,
  resetPassword,
  requestResetPassword,
  resetPasswordByToken,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  },
};
