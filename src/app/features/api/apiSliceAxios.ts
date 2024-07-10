"use client"
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@/app/store';
import { getCookie, setCookie } from 'cookies-next';
import { NextRequest, NextResponse } from 'next/server';
import { Router } from 'next/router';
import { redirect } from 'next/navigation';
import { PrivateOutlet } from '../../utils/private';
import { type } from 'os';
import { axiosBaseQuery } from '../../utils/axiosBaseQuery';
import axios from 'axios';
// import { permanentRedirect } from 'next/navigation'

const token = getCookie("token");

const axiosInstance = axios.create({
  // baseUrl: "https://localhost:7263/api/v1"
  // headers: {
  //   "Authorization": token ? `Bearer ${token}` : " "
  // }
})

axiosInstance.interceptors.request.use((req) => {
  // const { auth } = store.getState();

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
})

axiosInstance.interceptors.response.use((res) => {
  return res;
}, (error) => {
  console.log(error.response);
  const status = error.response ? error.response.status : 500;
  if (error.response?.status === 401) {
    redirect("/login")
  }
  if (status && status === 500) {
    localStorage.clear();
    // store.dispatch({ type: authConstants.LOGOUT_SUCCESS });
  }
  return Promise.reject(error);
})



export const apiSliceAxios = createApi({
  reducerPath: 'api', //optional
  baseQuery: axiosBaseQuery({
    baseUrl: 'https://localhost:40445/api/'
  }),
  tagTypes: ['Employee', 'Company', 'Department', 'JobTitle', 'Level'],
  endpoints: builder => ({})
});