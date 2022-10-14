import { Injectable } from '@nestjs/common';
import { Client, ClientKafka, Payload } from '@nestjs/microservices';
import {
  EmailStats,
  KafkaTopics,
  microserviceConfigFactory,
} from '../shared';

export const microserviceStatsReceiverConfig = microserviceConfigFactory('stats-receiver', 'stats');


@Injectable()
export class StatsService {
  @Client(microserviceStatsReceiverConfig)
  client: ClientKafka;

  async onModuleInit() {
    this.client.subscribeToResponseOf(KafkaTopics.getStats);

    await this.client.connect();
  }

  getStats(@Payload() stats: EmailStats) {
    this.client
      .emit(KafkaTopics.getStats, stats)
      .subscribe(() => console.log(`Stats sent ${JSON.stringify(stats)}`));
  }
}
