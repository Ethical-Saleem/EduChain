import { deleteCookie } from "cookies-next";
import { redirect } from "next/navigation";

const handleSignout = () => {
  console.log('signout');
  deleteCookie("token");
  deleteCookie("user");
  deleteCookie("userType");
  deleteCookie("currentCompany");
  deleteCookie("isAuthorized");
};

export function handleErrorResponse(response) {
  console.log('response', response)
  // return response.text().then(text => {
  // const data = text && JSON.parse(text);
  // if (!response.ok) {
  //   if ([401, 403].indexOf(response.status) != -1) {
  //     // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
  //     handleSignout();
  //     redirect("/login")
  //   }
  //   // let error = '';
  //   // if (Array.isArray(response)) {
  //   //   error = response.join();
  //   // } else {
  //   //   error = (response && response.message) || response.statusText;
  //   // }
  //   // return Promise.reject(error);
  // }
  return response;
  // })
};