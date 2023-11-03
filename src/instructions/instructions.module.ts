import { Module } from '@nestjs/common';
import { InstructionsService } from './instructions.service';
import { InstructionsController } from './instructions.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [InstructionsController],
  providers: [InstructionsService, PrismaService],
})
export class InstructionsModule {}
