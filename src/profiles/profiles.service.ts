import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Profile, Prisma } from '@prisma/client';
import { CreateProfileDto } from './dto/createProfile.dto';
import { error } from 'console';


@Injectable()
export class ProfilesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createProfileDto: CreateProfileDto): Promise<Profile | null> {
    try {
      const userHasProfile = await this.prismaService.profile.findFirst({
        where: {
          userId: createProfileDto.userId
        }
      })

      if (userHasProfile) throw new error

      const createUser = await this.prismaService.profile.create({
        data: {
          ...createProfileDto
        }
      })

      return createUser

    } catch (error) {
      throw new HttpException('El usuario ya cuenta con un perfil',  HttpStatus.BAD_REQUEST)
    } 
  }

  async findAll(): Promise<Profile[] | null> {
    try {
      return await this.prismaService.profile.findMany({
        include: {
          bots: true
        }
      });
    } catch (error) {
      throw new HttpException('Error',  HttpStatus.BAD_REQUEST)
    }
  }

  async findOne(id: number): Promise<Profile | null> {
    try {
      const findOneProfile = await this.prismaService.profile.findFirst({
        where: {
          id
        },
        include: {
          bots: true
        }
      });
      
      if (!findOneProfile) throw new error
      
      return findOneProfile

    } catch (error) {
      throw new HttpException('El perfil no existe', HttpStatus.BAD_REQUEST)
    }
  }

  async update(id: number, updateProfileDto: Prisma.ProfileUncheckedUpdateInput): Promise<Profile | null> {
    try {
      const updateProfile = await this.prismaService.profile.update({
        where: {
          id
        },
        data: updateProfileDto
      });

      if (!updateProfile) throw new error

      return updateProfile

    } catch (error) {
      throw new HttpException('El perfil no existe', HttpStatus.BAD_REQUEST)
    }    
  }

  async remove(id: number): Promise<Profile | null> {
    try {
      const deleteProfile = await this.prismaService.profile.delete({
        where: {
          id
        }
      });

      if (!deleteProfile) throw new error

      return deleteProfile

    } catch (error) {
      throw new HttpException('El perfil no existe', HttpStatus.BAD_REQUEST)
    }
  }
}
