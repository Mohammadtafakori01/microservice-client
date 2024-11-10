// src/app.service.ts
import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { UploadServiceClient } from './interfaces/upload.interface'; // Ensure the path is correct

@Injectable()
export class AppService {
  private uploadService: UploadServiceClient;

  constructor(
    @Inject('UPLOAD_PACKAGE') private readonly client: ClientGrpc, // Inject the gRPC client
  ) {}

  onModuleInit() {
    this.uploadService = this.client.getService<UploadServiceClient>('UploadService'); // Get reference to the gRPC service
  }

  // Function to send a request to the gRPC service
  uploadZipFile(targetDir: string, zipFile: Buffer): Observable<any> {
    const payload = { targetDir, zipFile: zipFile.toString('base64') }; // Convert buffer to base64 string
    return this.uploadService.upload(payload); // Call the 'upload' method on your gRPC service
  }
}
