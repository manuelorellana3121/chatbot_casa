import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FlowChatDto } from './dto/create-chat.dto';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { error } from 'console';

@Injectable()
export class ChatService {
  constructor (
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService
    ) {}

  async showBots(): Promise<Object | null> {
    try {
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
  
      if (!botsList) throw new error

      return botsList
    } catch (error) {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST)
    }
  }

  async chatFlow(id: number , flowChatDto: FlowChatDto): Promise<Object | null> {
        
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

    const botAction = await this.prismaService.action.findFirst({
      where: {
        instructionId: findInstructionByName.id
      },
      select: {
        id: true,
        action: true
      }
    })

    return( /*console.log("Saludos soy el bot:", findOneBot.name),*/
      botAction
    ) 
  }

  //En la clase del sabado te pregunto porque no supe donde debería colocar este metodo (si en el controller o en la funcion de arriba) para que reciba los parametros que se van a guardar en la tabla de Logs
  async chatLogs(userId: number, botId: number, instructionId: number, inputInstruction: string): Promise<void> {
    await this.prismaService.log.create({
      data: {
        userId: userId,
        botId: botId,
        instructionId: instructionId,
        instruction: inputInstruction,
        date: new Date()
      }
    })
    
  }
}
