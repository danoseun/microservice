import { KafkaOptions, Transport } from '@nestjs/microservices';

export const microserviceConfigFactory = (
  groupId: string,
  clientId?: string,
): KafkaOptions => {
  return {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: clientId,
        brokers: ['kafka:9092'],
      },
      consumer: {
        groupId: groupId,
      },
    },
  };
}