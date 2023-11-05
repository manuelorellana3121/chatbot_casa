import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Profile, Prisma } from '@prisma/client';


@Injectable()
export class ProfilesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createProfileDto: Prisma.ProfileCreateInput): Promise<Profile | null> {
    return await this.prismaService.profile.create({
      data: {
        ...createProfileDto
      }
    })
  }

  async findAll(): Promise<Profile[] | null> {
    return await this.prismaService.profile.findMany({
      include: {
        bots: true
      }
    });
  }

  async findOne(id: number): Promise<Profile | null> {
    return await this.prismaService.profile.findFirst({
      where: {
        id
      },
      include: {
        bots: true
      }
    });
  }

  async update(id: number, updateProfileDto: Prisma.ProfileUncheckedUpdateInput): Promise<Profile | null> {
    return await this.prismaService.profile.update({
      where: {
        id
      },
      data: updateProfileDto
    });
  }

  async remove(id: number): Promise<Profile | null> {
    return await this.prismaService.profile.delete({
      where: {
        id
      }
    });
  }
}
