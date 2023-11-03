import { Injectable } from '@nestjs/common';
import { CreateInstructionDto } from './dto/create-instruction.dto';
import { UpdateInstructionDto } from './dto/update-instruction.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma, Instruction, Bot } from '@prisma/client';


@Injectable()
export class InstructionsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createInstructionDto: Prisma.InstructionCreateInput): Promise<Instruction | null> {
    return await this.prismaService.instruction.create({
      data: {
        ...createInstructionDto
      }
    });
  }

  async findAll(): Promise<Instruction[] | null> {
    return await this.prismaService.instruction.findMany({});
  }

  async findOne(id: number): Promise<Instruction | null> {
    return await this.prismaService.instruction.findFirst({
      where: {
        id
      },
      include: {
        action: true
      }
    });
  }

  async update(id: number, updateInstructionDto: Prisma.InstructionUpdateInput): Promise<Instruction | null> {
    return await this.prismaService.instruction.update({
      where: {
        id
      },
      data: {
        ...updateInstructionDto
      }
    });
  }

  async remove(id: number): Promise<Instruction | null> {
    return await this.prismaService.instruction.delete({
      where: {
        id
      }
    });
  }
}
