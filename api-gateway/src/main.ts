import { NestFactory } from '@nestjs/core';
import { IndexModule } from './index.module';
import { microserviceConfigFactory } from '../shared';

const microserviceStatsConfig = microserviceConfigFactory('stats-receiver', 'stats')

async function bootstrap() {
  const app = await NestFactory.create(IndexModule);
  app.enableCors();
  app.connectMicroservice(microserviceStatsConfig);
  await app.startAllMicroservices();
  await app.listen(1554).then(() => {
    console.log(`App has started...`)
  });
}
bootstrap();
