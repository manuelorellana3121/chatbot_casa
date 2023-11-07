import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { BotsService } from './bots.service';
import { UpdateBotDto } from './dto/update-bot.dto';
import { Prisma } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth-guard';

@Controller('bots')
@UseGuards(AuthGuard)
export class BotsController {
  constructor(private readonly botsService: BotsService) {}

  @Post()
  create(@Body() createBotDto: Prisma.BotCreateInput) {
    return this.botsService.create(createBotDto);
  }

  @Get()
  findAll() {
    return this.botsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.botsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateBotDto: UpdateBotDto) {
    return this.botsService.update(id, updateBotDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.botsService.remove(id);
  }
}
