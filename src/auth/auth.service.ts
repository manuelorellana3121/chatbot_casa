import { HttpException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt'
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()

  //debo encriptarle la contraseña ✔
  //Tambien debo hacer que funcione la autenticación de JWT pero eso sería en auth
  //Buscar como funcionan los exception filters y los guards para que no se caiga el servidor por errores en el tipeado
  //Puede ser que utilice try catch para las validaciones a su vez

export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService
    ) {}

  async login(createAuthDto: CreateAuthDto) {
    const { email, password } = createAuthDto
    const findUser = await this.prismaService.user.findFirst({
      where: {
        email
      }
    })

    if (!findUser) throw new HttpException("User not found", 404)

    const checkPassword = await bcrypt.compare(password, (await findUser).password)

    if (!checkPassword) throw new HttpException("Incorrect Password", 401)

    const payload = { id: findUser.id, email: findUser.email };
    const token = this.jwtService.sign(payload)

    const data = {
      user: findUser,
      token
    }

    return data;
  }
}