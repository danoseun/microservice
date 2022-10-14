import { Injectable } from '@nestjs/common';
import { Client, ClientKafka, Payload } from '@nestjs/microservices';
import { EmailStats } from '../shared';
import {
  KafkaTopics,
  microserviceConfigFactory,
} from '../shared';
import { mockEmailSending } from '../mock-email-sending';

export const microserviceStatsConfig = microserviceConfigFactory('stats', 'stats');

export type EmailJob = Omit<EmailStats, 'status'>;

@Injectable()
export class EmailService {
  @Client(microserviceStatsConfig)
  client: ClientKafka;

  async onModuleInit() {
    this.client.subscribeToResponseOf(KafkaTopics.sendStats);

    await this.client.connect();
  }

  async sendEmail(@Payload() job: EmailJob) {
    const { amount, jobId } = job;
    for (let count = 1; count <= +amount; count++) {
      const emailCount = await mockEmailSending(count);
      this.client
        .send(KafkaTopics.sendStats, {
          jobId: jobId,
          amount,
          status: `${emailCount} of ${amount}`,
        })
        .subscribe(() => console.log(`Sent ${emailCount} of ${amount}`));
    }
  }
}
