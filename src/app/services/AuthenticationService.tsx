import { setCookie, getCookie, removeCookie } from "../utils/cookies";
import { BehaviorSubject } from "rxjs";
import Cookies from "js-cookie";
import { config } from "../config";
import requestOptions from "../helpers/RequestOptions";
import handleResponse from "../helpers/HandleResponses";

import { Demo } from "../../../types";

const getCurrentUser = () => {
    const user = Cookies.get("currentUser");
    return user ? JSON.parse(user) : null;
};
const currentUserSubject = new BehaviorSubject<Demo.TokenModel | null>(getCurrentUser());

async function login(email: string, password: string): Promise<any> {
  const response = await fetch(`${config.apiUrl}/auth/login`, requestOptions.post({ email, password}));

  const model = await handleResponse(response);

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
  const response = await fetch(
    `${config.apiUrl}/School`,
    await requestOptions.postForm(formData)
  ); 

  const model = await handleResponse(response);

  return model
}

async function registerUser(input: Demo.NewUser) {
  const response = await fetch(
    `${config.apiUrl}/User`,
    await requestOptions.post(input)
  )

  const model = await handleResponse(response);

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
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  },
};
