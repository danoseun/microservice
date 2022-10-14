import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaTopics } from '../shared';
import { EmailJob } from './email.service';
import { EmailService } from './email.service';

@Controller()
export class EmailController {
  constructor(private emailService: EmailService) {}

  @MessagePattern(KafkaTopics.sendEmail)
  sendEmail(@Payload() message: { value: EmailJob }) {
    const { value } = message;
    return this.emailService.sendEmail(value);
  }
}
