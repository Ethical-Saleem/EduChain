import { setCookie } from "cookies-next";
import { apiSlice } from "../api/apiSlice";
import { Demo } from "../../../../types/demo";

export interface User extends Demo.Employee {
  id?: string | null | undefined;
  userType: number;
  officeType: number;
  first_name: string
  last_name: string,
  companyId?: number,
  company?: Demo.Company,
  cslug?: string,
  bslug?: string,
  organizationId?: string
}

export interface UserResponse {
  jobTitle: any;
  email: '';
  department: any;
  companyId: any;
  id?: null;
  user: User;
  token: string | undefined;
}

export interface LoginRequest {
  email: string
  password: string
}

export const authApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<any, LoginRequest>({
      query: (credentials) => ({
        url: 'auth/signin',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (responseData: any): any => {
        console.log('responseData', responseData)
        setCookie("token", responseData?.token);
        setCookie("currentCompanyId", responseData?.user?.companyId);
        setCookie("currentBranchId", responseData.user.branchId);
        setCookie("userType", responseData?.user?.userType);
        // setCookie("userFirstname", responseData?.user?.firstName);
        setCookie("userId", responseData?.user?.id);

        if (responseData?.user?.company) {
          setCookie("currentCompanySlug", responseData?.user?.company?.cslug);
          // setCookie("currentBranchSlug", responseData?.user?.branch?.bslug);
          // setCookie("officeType", responseData?.user?.branch?.officeType);
        } else {
          setCookie("currentCompanySlug", responseData?.user?.cslug);
          setCookie("currentBranchSlug", responseData?.user?.bslug);
          setCookie("officeType", responseData?.user?.officeType);
        }
        if (responseData?.user?.organizationId) {
          setCookie("organizationId", responseData?.user?.organizationId);
        }


        // let cslug = res.user.company.cslug;
        // let bslug = res.user.branch.bslug
        // setCookie("user", responseData?.token);

        // const userType = responseData.user?.userType;

        // if (userType === 2) {
        //   redirect("/hr/Dashboard");
        // }
        // else if (userType === 2) {
        //   router.push("/hr/dashboard");
        // } else if (userType === 3) {
        //   router.push("/hr/Dashboard");
        // }
        return responseData;
      },
      transformErrorResponse: (error) => {
        console.log('error', error)
      },
    }),
    getUser: builder.query<UserResponse, void>({
      query: () => ({
        url: 'auth/user',
        method: 'GET'
      })
    }),
    // protected: builder.mutation<{ message: string }, void>({
    //   query: () => 'protected'
    // })
  })
})

export const { useLoginMutation, useGetUserQuery } = authApi;