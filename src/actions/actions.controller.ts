import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ActionsService } from './actions.service';
import { Prisma } from '@prisma/client';

@Controller('actions')
export class ActionsController {
  constructor(private readonly actionsService: ActionsService) {}

  @Post()
  create(@Body() createActionDto: Prisma.ActionCreateInput) {
    return this.actionsService.create(createActionDto);
  }

  @Get()
  findAll() {
    return this.actionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.actionsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateActionDto: Prisma.ActionUpdateInput) {
    return this.actionsService.update(id, updateActionDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.actionsService.remove(id);
  }
}
