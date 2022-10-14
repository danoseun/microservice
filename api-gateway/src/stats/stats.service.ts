import { Injectable } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { EmailStats } from '../../shared';
import { SocketGateway } from '../../shared';

@Injectable()
export class StatsService {
  constructor(private readonly socketGetaway: SocketGateway) {}

  getStats(@Payload() emailStats: EmailStats) {
    return this.socketGetaway.handleMessage(emailStats);
  }
}
