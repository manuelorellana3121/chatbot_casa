import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

 
@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      // secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '24h'
      }
    })
    ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
})
export class AuthModule {}
