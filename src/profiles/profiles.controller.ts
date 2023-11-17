import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { Prisma } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth-guard';
import { CreateProfileDto } from './dto/createProfile.dto';

@Controller('profiles')
@UseGuards(AuthGuard)
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  create(@Body() createProfileDto: CreateProfileDto){
    return this.profilesService.create(createProfileDto)
  }

  @Get()
  findAll() {
    return this.profilesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.profilesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProfileDto: Prisma.ProfileUncheckedUpdateInput) {
    return this.profilesService.update(id, updateProfileDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.profilesService.remove(id);
  }
}
