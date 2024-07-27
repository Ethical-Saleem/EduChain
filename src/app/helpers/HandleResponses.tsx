import { AuthenticationService } from "../services/AuthenticationService";

export default function handleResponse(response: Response): Promise<any> {
  return response.text().then(text => {
    const data = text ? JSON.parse(text) : null;

    if (!response.ok) {
      if ([401, 403].includes(response.status)) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        AuthenticationService.logout();
        window.location.href = "/";
      }

      let error = '';
      if (Array.isArray(data)) {
        error = data.join();
      } else {
        error = (data && data.message) || response.statusText;
      }

      return Promise.reject(error);
    }

    return data;
  });
}
