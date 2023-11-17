import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Bot, Prisma } from '@prisma/client';
import { error } from 'console';

@Injectable()
export class BotsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createBotDto: Prisma.BotCreateInput): Promise<Bot | null> {
    try {
      const duplicateBot = await this.prismaService.bot.findFirst({
        where: {
          name: createBotDto.name
        }
      })
      
      if (duplicateBot) throw new error
  
      return await this.prismaService.bot.create({
        data: {
          ...createBotDto
        }
      })
    } catch (error) {
      throw new ConflictException('Este bot ya existe en la base de datos')
    }
  }

  async findAll(): Promise<Bot[] | null> {
    try {
      return await this.prismaService.bot.findMany({});
    } catch (error) {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST)
    }
  }

  async findOne(id: number): Promise<Bot | null> {
    try {
      const findOneBot = await this.prismaService.bot.findFirst({
        where: {
          id
        },
        include: {
          instructions: true
        }
      });

      if (!findOneBot) throw new error 

      return findOneBot 

    } catch (error) {
      throw new HttpException('Este bot no existe', HttpStatus.BAD_REQUEST)
    }
  }

  async update(id: number, updateBotDto: Prisma.BotUpdateInput): Promise<Bot | null> {
    try {
      const updateBot = await this.prismaService.bot.update({
        where: {
          id
        },
        data: updateBotDto
      }); 
  
      if (!updateBot) throw new error
  
      return updateBot

    } catch (error) {
      throw new HttpException('Este bot no existe', HttpStatus.BAD_REQUEST)
    }
  }

  async remove(id: number): Promise<Bot | null> {
    try {
      const deleteBot = await this.prismaService.bot.delete({
        where: {
          id 
        }
      })
  
      if (!deleteBot) throw new error
  
      return deleteBot

    } catch (error) {
      throw new HttpException('Este bot no existe', HttpStatus.BAD_REQUEST)
    }
  }
}
