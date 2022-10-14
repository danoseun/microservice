import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  EmailStats,
  KafkaTopics
} from '../shared';
import { StatsService } from './stats.service';

@Controller('posts')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @MessagePattern(KafkaTopics.sendStats)
  getStats(@Payload() stats: { value: EmailStats }) {
    const { value } = stats;
    return this.statsService.getStats(value);
  }
}
