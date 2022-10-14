import { Module } from '@nestjs/common';
import { SocketGateway } from '../../shared';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';

@Module({
  controllers: [StatsController],
  providers: [StatsService, SocketGateway],
})
export class StatsModule {}
