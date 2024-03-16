import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat, User } from '@entities/index';
import { CreateChatDto } from '@dto/createChat.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat, 'gigaChat')
    private readonly chatRepository: Repository<Chat>,
    @InjectRepository(User, 'gigaChat')
    private readonly userRepository: Repository<User>,
  ) {}

  async createChat(chatDto: CreateChatDto) {
    const { password, ...user } = await this.userRepository.findOne({
      where: { usertag: chatDto.usertag },
    });
    const chat = this.chatRepository.create({
      chatName: chatDto.chatName,
      users: [user],
    });
    await this.chatRepository.save(chat);
    return chat;
  }

  async getChats(userUsertag: string) {
    const user  = await this.userRepository.findOne({
      select: ['username', 'usertag', 'chats', 'uuid'],
      where: { usertag: userUsertag },
      relations: ['chats', 'chats.users'],
    });

    if (user && user.chats && user.chats.length > 0) {
      user.chats.forEach(chat => {
        chat.users = chat.users.filter(user => user.usertag !== userUsertag);
      });
    }

    return user;
  }

  async addUserToChat(chatDto: CreateChatDto) {
    const chat = await this.chatRepository.findOne({
      where: { chatId: chatDto.chatId },
      relations: ['users'],
    });
    const user = await this.userRepository.findOne({
      select: ['uuid', 'username', 'usertag'],
      where: { usertag: chatDto.usertag },
    });
    chat.users.push(user);
    await this.chatRepository.save(chat);
    return chat;
  }

  async deleteChat(chatId: number) {
    const chat = await this.chatRepository.findOne({where: { chatId: chatId }});
    if (chat) {
        return await this.chatRepository.remove(chat);
    } else {
        throw new Error('Chat not found');
    }
  }
}
