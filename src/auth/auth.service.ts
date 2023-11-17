import { HttpException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt'
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()

export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService
    ) {}

  async login(createAuthDto: CreateAuthDto): Promise<Object | null> {
    
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