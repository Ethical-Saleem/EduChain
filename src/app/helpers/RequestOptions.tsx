import { AuthenticationService } from "../services/AuthenticationService";

interface RequestOptions {
  method: string;
  headers: HeadersInit;
  body?: string | FormData;
}

const requestOptions = {
  get(): RequestOptions {
    return {
      method: 'GET',
      ...headers()
    };
  },
  post(body: any): RequestOptions {
    return {
      method: 'POST',
      ...headers(),
      body: JSON.stringify(body)
    };
  },
  postForm(formData: FormData): RequestOptions {
    return {
      method: 'POST',
      ...headers(true),
      body: formData
    };
  },
  patch(body: any): RequestOptions {
    return {
      method: 'PATCH',
      ...headers(),
      body: JSON.stringify(body)
    };
  },
  put(body: any): RequestOptions {
    return {
      method: 'PUT',
      ...headers(),
      body: JSON.stringify(body)
    };
  },
  putForm(formData: FormData): RequestOptions {
    return {
      method: 'PUT',
      ...headers(true),
      body: formData
    };
  },
  delete(): RequestOptions {
    return {
      method: 'DELETE',
      ...headers()
    };
  }
};

function headers(form: boolean = false): { headers: HeadersInit } {
  const currentUser = AuthenticationService.currentUserValue;
  const hostname = typeof window !== "undefined" ? document.location.host : '';
  const authHeader = currentUser?.accessToken ? { Authorization: 'Bearer ' + currentUser.accessToken } : {};

  const headers: any = form
    ? {
        Holder: hostname,
        ...(authHeader && { Authorization: authHeader.Authorization })
      }
    : {
        'Content-Type': 'application/json',
        Holder: hostname,
        ...(authHeader && { Authorization: authHeader.Authorization })
      };

  return { headers };
}

export default requestOptions;