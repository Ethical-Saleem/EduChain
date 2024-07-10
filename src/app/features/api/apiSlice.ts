"use client"
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie, setCookie } from 'cookies-next';
// import { permanentRedirect } from 'next/navigation'

// const api = 'https://test1k.azurewebsites.net'
const api = 'https://localhost:40445'

export const apiSlice = createApi({
  reducerPath: 'api', //optional
  baseQuery: fetchBaseQuery({
    baseUrl: `${api}/api`,
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store,
      // let's use that for authenticated requests

      const token = getCookie("token");
      // const user = JSON.parse(getCookie("user"));
      // console.log('user', user)
      // console.log('getCookie("token")', getCookie("token"))
      // const token = (getState() as RootState).auth.token;

      if (token) {
        setCookie("isAuthorized", "true")
        headers.set("isAuthorized", "true")
        headers.set('authorization', `Bearer ${token}`)
      } else {
        // redirect('/login', 'replace')
      }

      return headers;
    },
  }),
  tagTypes: [
    'Organization',
    'Employee',
    'Company',
    'Branch',
    'Department',
    'JobTitle',
    'Level',
    'Administrator',
    'EducationalRequirementType',
    'RequiredEducationalQualification',
    'JobProfile',
    'Vacancy',
    'VacancySetting',
    'EmploymentType',
    'InterviewDuration',
    'Applicant',
    'Application',
    'ApplicationInterviewer',
    'ApplicationInterviewScheduling',
    'Degree',
    'NewHireEmailRequest',
    'NewHire',
    'ProjectTask',
    'Resource',
    'Event',
    'EmployeeProfile',
    'Category',
    'NewHire',
    'EmployeeTask',
    'EmployeeResource',
    'EmployeeBeneficiary',
    'EmployeeChild',
    'TaskGroup',
    'DrugAndAlcoholAgreement',
    'HTMLTemplate',
    'EmployeeExperience',
    'EmployeeEducation',
  ],
  endpoints: builder => ({})
});