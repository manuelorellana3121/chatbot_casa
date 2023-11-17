import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, Action } from '@prisma/client';
import { error } from 'console';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ActionsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createActionDto: Prisma.ActionCreateInput): Promise<Action | null> {
    try {
      const duplicateAction = await this.prismaService.action.findFirst({
        where: {
          action: createActionDto.action
        }
      })
  
      if (duplicateAction) throw new error
  
      return await this.prismaService.action.create({
        data: {
          ...createActionDto
        }
      }); 
    } catch (error) {
      throw new ConflictException('Esta accion ya se encuentra en la base de datos')
    }
  }

  async findAll(): Promise<Action[] | null> {
    try {
      return await this.prismaService.action.findMany({}) 
    } catch (error) {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST)
    }
  }

  async findOne(id: number): Promise<Action | null> {
    try {
      const findOneAction = await this.prismaService.action.findFirst({
        where:{
          id
        },
        include: {
          Instruction: true,
        }
      }); 

      if (!findOneAction) throw new error
      
      return findOneAction

    } catch (error) {
      throw new HttpException('La accion no existe', HttpStatus.BAD_REQUEST)
      
    }
  }

  async update(id: number, updateActionDto: Prisma.ActionUpdateInput): Promise<Action | null> {
    try {
      const updateAction = await this.prismaService.action.update({
        where: {
          id
        },
        data: {
          ...updateActionDto
        }
      })  

      if (!updateAction) throw new error

      return updateAction

    } catch (error) {
      throw new HttpException('La accion no existe', HttpStatus.BAD_REQUEST)
    }
  }

  async remove(id: number): Promise<Action | null> {
    try {
      const deleteAction = await this.prismaService.action.delete({
        where: {
          id
        }
      })

      if (!deleteAction) throw new error

      return deleteAction

    } catch (error) {
      throw new HttpException('La accion no existe', HttpStatus.BAD_REQUEST)
    }
  }
}
