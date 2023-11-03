import { Injectable } from '@nestjs/common';
import { Prisma, Action } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ActionsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createActionDto: Prisma.ActionCreateInput): Promise<Action | null> {
    return await this.prismaService.action.create({
      data: {
        ...createActionDto
      }
    });
  }

  async findAll(): Promise<Action[] | null> {
    return await this.prismaService.action.findMany({})
  }

  async findOne(id: number): Promise<Action | null> {
    return await this.prismaService.action.findFirst({
      where:{
        id
      },
      include: {
        Instruction: true,
      }
    });
  }

  async update(id: number, updateActionDto: Prisma.ActionUpdateInput): Promise<Action | null> {
    return await this.prismaService.action.update({
      where: {
        id
      },
      data: {
        ...updateActionDto
      }
    })
  }

  async remove(id: number): Promise<Action | null> {
    return await this.prismaService.action.delete({
      where: {
        id
      }
    })
  }
}
