import { NestFactory } from '@nestjs/core';
import { EmailModule } from './email.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import {
  microserviceConfigFactory,
} from '../shared';

const microserviceEmailConfig = microserviceConfigFactory('email', 'email');

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    EmailModule, 
    microserviceEmailConfig
  );

  app.listen();
}

bootstrap();
