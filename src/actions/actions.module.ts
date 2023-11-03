import { Module } from '@nestjs/common';
import { ActionsService } from './actions.service';
import { ActionsController } from './actions.controller';
import { PrismaService } from 'src/prisma.service';


@Module({
  controllers: [ActionsController],
  providers: [ActionsService, PrismaService],
})
export class ActionsModule {}
