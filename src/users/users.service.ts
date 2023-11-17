import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { error } from 'console';


@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User | null> {
    
    const duplicateUser = await this.prismaService.user.findFirst({
      where: {
        email: createUserDto.user.email
      }
    })

    if (duplicateUser) throw new ConflictException('El email ingresado ya se encuentra registrado') 

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
    try {
      const findUsers = await this.prismaService.user.findMany({
        include: {
          profile: true
        }
      })

      return findUsers

    } catch (error) {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST)
    }
    
  }

  async findOne(id: number): Promise<User | null> {
    try {
      const user = await this.prismaService.user.findFirst({
        where: {
          id
        },
        include: {
          profile: true
        }
      })

      if (!user) throw new HttpException('Usuario no encontrado', HttpStatus.BAD_REQUEST)

      return user

    } catch (error) {
      throw new HttpException('Usuario no existe', HttpStatus.BAD_REQUEST)
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    try {
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
    } catch (error) {
      throw new HttpException('El usuario no existe', HttpStatus.BAD_REQUEST)
    }    
  }
  
  async remove(id: number): Promise<User | null> {
    try {
      const deleteUser = await this.prismaService.user.delete({
        where: {
          id
        }
      });

      if (!deleteUser) throw new error

      return deleteUser

    } catch (error) {
      throw new HttpException('El usuario no existe', HttpStatus.BAD_REQUEST)
    }
  }
}
