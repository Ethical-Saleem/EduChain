
import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { AuthenticationService } from "../services/AuthenticationService";
import { Demo } from "../../../types";
import { config } from "../config";

const api = axios.create({
    baseURL: config.apiUrl,
  });
  
  // Request interceptor to add the Authorization header to every request
  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const currentUser: Demo.TokenModel | null = AuthenticationService.currentUserValue;
      if (currentUser && currentUser.accessToken) {
        config.headers['Authorization'] = `Bearer ${currentUser.accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const handleClientSideRedirects = async (error: any) => {
    const originalRequest = error.config;
    originalRequest._retryCount = originalRequest._retryCount || 0;
  
    // if (error.response.status === 401 && originalRequest._retryCount < 3) {
    //   originalRequest._retryCount += 1;
    //   console.log('original_request', originalRequest);
    //   try {
    //     const refreshedTokens = await AuthenticationService.refreshToken();
    //     axios.defaults.headers.common['Authorization'] = 'Bearer ' + refreshedTokens.accessToken;
    //     originalRequest.headers['Authorization'] = 'Bearer ' + refreshedTokens.accessToken;
    //     return api(originalRequest);
    //   } catch (refreshError) {
    //     // AuthenticationService.logout();
    //     console.log("refreshError", refreshError);
    //     return Promise.reject(refreshError);
    //   }
    // }
  
    return Promise.reject(error);
  };

  api.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    async (error) => {
      console.log('api-error', error);

      if (error.response) {
        if (error.response?.status === 401) {
          AuthenticationService.logout();
        }
        return Promise.reject(error);
      }
      
      return Promise.reject(error);
    }
  );
  
  export default api;
