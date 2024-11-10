// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Increase the JSON body size limit to 50MB (adjust as needed)
  app.use(bodyParser.json({ limit: '100mb' }));
  app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

  // Enable CORS for the specific IP-based origin
  app.enableCors({
    origin: 'http://victory.sample.local', // Allow requests from this specific IP address
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Authorization', 'Content-Type'], // Specify allowed headers if necessary
    credentials: true, // Allow cookies and credentials to be sent
  });
  await app.listen(3000);
}
bootstrap();
