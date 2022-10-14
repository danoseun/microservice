import { NestFactory } from '@nestjs/core';
import { StatsModule } from './stats.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import {
  microserviceConfigFactory,
} from '../shared';

const microserviceStatsConfig = microserviceConfigFactory('stats', 'stats');

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    StatsModule,
    microserviceStatsConfig
  );
  
  app.listen();
}

bootstrap();
