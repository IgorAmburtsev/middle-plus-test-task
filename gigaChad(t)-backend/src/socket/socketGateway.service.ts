import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from '@entities/index';
import { MessageDto } from '@dto/index';

@Injectable()
export class SocketGatewayService {
  constructor(
    @InjectRepository(Message, 'gigaChat')
    private readonly messageRepository: Repository<Message>,
  ) {}

  async sendMessage(messageDto: MessageDto) {
    const message = await this.messageRepository.save({
      chatId: messageDto.chatId,
      userTo: messageDto.userTo,
      userFrom: messageDto.userFrom,
      messageText: messageDto.messageText,
    });
    return { message };
  }
}
