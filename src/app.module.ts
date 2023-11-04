import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { BotsModule } from './bots/bots.module';
import { InstructionsModule } from './instructions/instructions.module';
import { ActionsModule } from './actions/actions.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule, 
    ProfilesModule, 
    BotsModule, 
    InstructionsModule, 
    ActionsModule, AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
