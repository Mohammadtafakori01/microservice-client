import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  uploadZipFile(@Body() body: { targetDir: string; zipFile: string }) {
    const zipBuffer = Buffer.from(body.zipFile, 'base64'); // Convert base64 string to buffer
    return this.appService.uploadZipFile(body.targetDir, zipBuffer);
  }
}
