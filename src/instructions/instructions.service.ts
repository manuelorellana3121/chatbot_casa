import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, Instruction, Bot } from '@prisma/client';
import { error } from 'console';


@Injectable()
export class InstructionsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createInstructionDto: Prisma.InstructionCreateInput): Promise<Instruction | null> {
    try {
      const duplicateInstruction = await this.prismaService.instruction.findFirst({
        where: {
          instruction: createInstructionDto.instruction
        }
      })
      
      if (duplicateInstruction) throw new error
  
      return await this.prismaService.instruction.create({
        data: {
          ...createInstructionDto
        }
      });
    } catch (error) {
      throw new ConflictException('Esta instruccion ya existe en la base de datos')
    }
  }

  async findAll(): Promise<Instruction[] | null> {
    try {
      return await this.prismaService.instruction.findMany({}); 
    } catch (error) {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST)
    }
  }

  async findOne(id: number): Promise<Instruction | null> {
    try {
      const findOneInstruction = await this.prismaService.instruction.findFirst({
        where: {
          id
        },
        include: {
          action: true
        }
      });

      if (!findOneInstruction) throw new error

      return findOneInstruction

    } catch (error) {
      throw new HttpException("La instruccion no existe", HttpStatus.BAD_REQUEST)
    }
  }

  async update(id: number, updateInstructionDto: Prisma.InstructionUpdateInput): Promise<Instruction | null> {
    try {
      const updateInstruction = await this.prismaService.instruction.update({
        where: {
          id
        },
        data: {
          ...updateInstructionDto
        }
      }); 

      if (!updateInstruction) throw new error

      return updateInstruction
    } catch (error) {
      throw new HttpException('La inctruccion no existe', HttpStatus.BAD_REQUEST) 
    }
  }

  async remove(id: number): Promise<Instruction | null> {
    try {
      const deleteInstruction = await this.prismaService.instruction.delete({
        where: {
          id
        }
      }); 

      if (!deleteInstruction) throw new error

      return deleteInstruction 

    } catch (error) {
      throw new HttpException('La instruccion no existe', HttpStatus.BAD_REQUEST)
    }
  }
}
