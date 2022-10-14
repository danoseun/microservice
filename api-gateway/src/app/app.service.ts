import { Injectable } from '@nestjs/common';
import { Client, ClientKafka } from '@nestjs/microservices';
import { Payload } from '@nestjs/microservices';
import { KafkaTopics, microserviceConfigFactory, generateJobID } from '../../shared';

const microserviceEmailConfig = microserviceConfigFactory('email', 'email');

@Injectable()
export class AppService {
  @Client(microserviceEmailConfig)
  client: ClientKafka;

  async onModuleInit() {
    this.client.subscribeToResponseOf(KafkaTopics.sendEmail);

    await this.client.connect();
  }

  sendEmail(@Payload() amount: number) {
    const id = generateJobID();
    this.client.emit(KafkaTopics.sendEmail, { amount, id });
    return id;
  }
}
