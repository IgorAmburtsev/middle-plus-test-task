import { Controller, Body, Post, Get, Delete, Req } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatDto } from '@dto/index';

@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('/create')
  async createChat(@Body() chatDto:ChatDto) {
    return this.chatService.createChat(chatDto);
  }

  @Post('/getChats')
  async getChats(@Body() chatDto:ChatDto) {
    return this.chatService.getChats(chatDto.usertag);
  }

  @Post('/addUser')
  async addUser(@Body() chatDto:ChatDto) {
    return this.chatService.addUserToChat(chatDto);
  }

  @Delete('/delete')
  async deleteChat(@Body() chatDto:ChatDto) {
    return this.chatService.deleteChat(chatDto.chatId);
  }
}
