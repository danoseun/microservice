import { Module } from '@nestjs/common';
import { AppModule } from './app/app.module';
import { StatsModule } from './stats/stats.module';
@Module({
  imports: [AppModule, StatsModule],
})
export class IndexModule {}
