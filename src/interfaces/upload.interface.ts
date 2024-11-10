import { Observable } from 'rxjs';

// Interface for the gRPC client (upload service)
export interface UploadServiceClient {
  // The `upload` method takes a payload with targetDir (string) and zipFile (base64-encoded string)
  upload(payload: { targetDir: string; zipFile: string }): Observable<any>;
}
