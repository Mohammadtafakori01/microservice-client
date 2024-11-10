import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'UPLOAD_PACKAGE', // This is an identifier for your gRPC service
        transport: Transport.GRPC,
        options: {
          package: 'uploadpb', // The package name in your .proto file
          protoPath: join(__dirname, './proto/upload.proto'), // Path to your proto file
          url: 'localhost:50051',
        },
      },
    ]),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
