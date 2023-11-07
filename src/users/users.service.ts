import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User | null> {
    const saltOrRounds = parseInt(process.env.SALT_OR_ROUNDS) 
    const plainPwd = createUserDto.user.password
    const toHashPwd = await bcrypt.hash(plainPwd, saltOrRounds)
    const user = await this.prismaService.user.create({
      data: {
        ...createUserDto.user,
        password: toHashPwd
      }
    })

    if (user) {
      await this.prismaService.profile.create({
        data: {
          ...createUserDto.profile,
          userId: user.id
        }
      })
    }

    return user
  }

  async findAll(): Promise<User[] | null> {
    return await this.prismaService.user.findMany({
      include: {
        profile: true
      }
    })
  }

  async findOne(id: number): Promise<User | null> {
    return await this.prismaService.user.findFirst({
      where: {
        id
      },
      include: {
        profile: true
      }
    })
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    
    if(updateUserDto.user.password){
      const saltOrRounds = parseInt(process.env.SALT_OR_ROUNDS)
      const newPassword = updateUserDto.user.password
      const toHashPwd = await bcrypt.hash(newPassword, saltOrRounds)

      return await this.prismaService.user.update({
        where: {
          id
        },
        data: {
          ...updateUserDto.user,
          password: toHashPwd}
      });
    } else {
      return await this.prismaService.user.update({
        where: {
          id
        },
        data: updateUserDto.user,
      });
    }
  }
  
  async remove(id: number): Promise<User | null> {
    return await this.prismaService.user.delete({
      where: {
        id
      }
    });
  }
}
