import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { InstructionsService } from './instructions.service';
import { Prisma } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth-guard';

@Controller('instructions')
@UseGuards(AuthGuard)
export class InstructionsController {
  constructor(private readonly instructionsService: InstructionsService) {}

  @Post()
  create(@Body() createInstructionDto: Prisma.InstructionCreateInput) {
    return this.instructionsService.create(createInstructionDto);
  }

  @Get()
  findAll() {
    return this.instructionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.instructionsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateInstructionDto: Prisma.InstructionUpdateInput) {
    return this.instructionsService.update(id, updateInstructionDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.instructionsService.remove(id);
  }
}
