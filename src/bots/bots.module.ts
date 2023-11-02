import { Module } from '@nestjs/common';
import { BotsService } from './bots.service';
import { BotsController } from './bots.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [BotsController],
  providers: [BotsService, PrismaService],
})
export class BotsModule {}
