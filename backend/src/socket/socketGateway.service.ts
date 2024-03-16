import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat, Message, User } from '@entities/index';
import { MessageDto } from '@dto/index';

@Injectable()
export class SocketGatewayService {
  constructor(
    @InjectRepository(Message, 'gigaChat')
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(Chat, 'gigaChat')
    private readonly chatRepository: Repository<Chat>,
  ) {}

  async sendMessage(messageDto: MessageDto){

    const chat = await this.chatRepository.findOne({where: {chatId: messageDto.chatId}, relations: ['messages'] });
    const message = this.messageRepository.create({
      chat,
      userTo: messageDto.userTo,
      userFrom: messageDto.userFrom,
      messageText: messageDto.messageText,
    });

    return this.messageRepository.save(message);
  }

  async findMessagesByChatId(messageDto: MessageDto) {
    console.log(messageDto.chatId)
    return this.messageRepository.find({
      where: { chat: { chatId: messageDto.chatId } },
      relations: ['chat'],
      order: { createdDate: 'ASC' },
    });
  }

  async editMessage(messageDto: MessageDto) {
    const message = await this.messageRepository.findOne({
      where: { id: messageDto.id, chat: {chatId: messageDto.chatId} },
    });
    message.messageText = messageDto.messageText;
    message.edited = true;
    return this.messageRepository.save(message);
  }
}
