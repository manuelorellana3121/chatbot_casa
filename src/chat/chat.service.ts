import { HttpException, Injectable } from '@nestjs/common';
import { FlowChatDto } from './dto/create-chat.dto';
import { PrismaService } from 'src/prisma.service';
import { Action, Bot, Instruction } from '@prisma/client';

@Injectable()
export class ChatService {
  constructor (private readonly prismaService: PrismaService) {}

//voy a crear algo parecido a la pantalla de bot pero que enste
//solo me traiga los datos necesarios de los bots y sus acciones podría ser

//Si le coloco Promise<Bot[] | null> no me funciona... """Preguntar"""

  async showBots() {
    const botsList = await this.prismaService.bot.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        instructions: {
          select: {
            id: true,
            instruction: true,
          }
        }
      }
    })

    return botsList
  }

// mismo que el anterior... """Preguntar"""
  async chatFlow(id: number , flowChatDto: FlowChatDto) {
    const findOneBot = await this.prismaService.bot.findFirst({
      where: {
        id
      }
    })

    if(!findOneBot) throw new HttpException("Bot not found",404);
    
    const findInstructionByName = await this.prismaService.instruction.findFirst({
      where: {
        instruction: flowChatDto.instruction
      }
    }) 

    if (!findInstructionByName) throw new HttpException("Instruction not found",404)

    return( console.log("Saludos soy el bot:", findOneBot.name),
      await this.prismaService.action.findFirst({
        where: {
          instructionId: findInstructionByName.id
        },
        select: {
          id: true,
          action: true
        }
      })
    ) 
  }
}
