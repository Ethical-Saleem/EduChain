import { AuthenticationService } from "../services/AuthenticationService";


export default function handleBlobResponse(response: Response): Promise<{ data: Blob; fileName: string }> {
  return new Promise((resolve, reject) => {
    if (!response.ok) {
      response.text().then(text => {
        const data = text ? JSON.parse(text) : null;
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
        reject(error);
      }).catch(reject);
    } else {
      response.blob().then(blob => {
        if (!response.ok) {
          if ([401, 403].includes(response.status)) {
            // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
            AuthenticationService.logout();
            window.location.href = "/";;
          }
        }
        console.log(response.headers);
        const contentDisposition = response.headers.get('Content-Disposition');
        const fileName = contentDisposition
          ? decodeURI(contentDisposition.split('filename*=UTF-8\'\'')[1])
          : 'unknown';
        resolve({ data: blob, fileName: fileName });
      }).catch(reject);
    }
  });
}