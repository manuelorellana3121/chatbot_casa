import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { BotsModule } from './bots/bots.module';
import { InstructionsModule } from './instructions/instructions.module';
import { ActionsModule } from './actions/actions.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UsersModule, 
    ProfilesModule, 
    BotsModule, 
    InstructionsModule, 
    ActionsModule, AuthModule, ChatModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
