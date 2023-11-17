import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { FlowChatDto } from './dto/create-chat.dto';
import { AuthGuard } from 'src/auth/auth-guard';
import { JwtService } from '@nestjs/jwt';
import { request } from 'express';

@Controller('chat')
@UseGuards(AuthGuard)
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly jwtService: JwtService
    ) {}

@Get()
showBots() {
  return this.chatService.showBots();
}

@Post(':id')
chatFlow(@Param('id', ParseIntPipe) id: number, @Body() flowChatDto: FlowChatDto){
  // const token = request.headers.authorization.split(' ')[1]
  // const decodedToken = this.jwtService.decode(token)
  // const userId = decodedToken.id
  // this.chatService.chatLogs(userId,id,1,flowChatDto)
  return this.chatService.chatFlow(id, flowChatDto)
}


}
