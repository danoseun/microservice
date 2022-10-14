import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaTopics, EmailStats } from '../../shared';
import { StatsService } from './stats.service';

@Controller()
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @MessagePattern(KafkaTopics.getStats)
  sendEmail(@Payload() message : { value : EmailStats}) {
    const { value } = message;
    return this.statsService.getStats(value);
  }
}
