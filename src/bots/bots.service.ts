import { Injectable } from '@nestjs/common';
import { UpdateBotDto } from './dto/update-bot.dto';
import { PrismaService } from 'src/prisma.service';
import { Bot, Prisma } from '@prisma/client';

@Injectable()
export class BotsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createBotDto: Prisma.BotCreateInput): Promise<Bot | null> {
    return await this.prismaService.bot.create({
      data: {
        ...createBotDto
      }
    })
  }

  async findAll(): Promise<Bot[] | null> {
    return await this.prismaService.bot.findMany({});
  }

  async findOne(id: number): Promise<Bot | null> {
    return await this.prismaService.bot.findFirst({
      where: {
        id
      },
      include: {
        instructions: true
      }
    });
  }

  async update(id: number, updateBotDto: Prisma.BotUpdateInput): Promise<Bot | null> {
    return await this.prismaService.bot.update({
      where: {
        id
      },
      data: updateBotDto
    });
  }

  async remove(id: number): Promise<Bot | null> {
    return await this.prismaService.bot.delete({
      where: {
        id 
      }
    })
  }
}
