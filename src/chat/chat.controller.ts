import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ChatService } from './chat.service';
import { FlowChatDto } from './dto/create-chat.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

//voy a crear algo parecido a la pantalla de bot pero que enste
//solo me traiga los datos necesarios de los bots y sus acciones podría ser

@Get()
showBots() {
  return this.chatService.showBots();
}

@Get(':id')
chatFlow(@Param('id', ParseIntPipe) id: number, @Body() flowChatDto: FlowChatDto){
  return this.chatService.chatFlow(id, flowChatDto)
}


}
