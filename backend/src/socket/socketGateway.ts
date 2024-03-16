import { OnModuleInit } from '@nestjs/common';
import {
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { SocketGatewayService } from './socketGateway.service';
import { MessageDto } from '@dto/index';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    transports: ['websocket', 'polling'],
  },
})
export class SocketGateway implements OnModuleInit {
  constructor(
    private readonly socketGatewayService: SocketGatewayService,
  ) {}

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log('connected', socket.id);
    });
  }

  @SubscribeMessage('createMessage')
  async createMessage(@MessageBody() messageDto: MessageDto) {
    await this.socketGatewayService.sendMessage(messageDto).then(() => {
      this.server.emit('createdMessage', {
        userTo: messageDto.userTo,
        userFrom: messageDto.userFrom,
        messageText: messageDto.messageText,
      });
    });
  }

  @SubscribeMessage('findMessages')
  async findMessages(@MessageBody() messageDto: MessageDto) {
    const response =
      await this.socketGatewayService.findMessagesByChatId(messageDto);
    this.server.emit('updateMessages', response);
  }

  @SubscribeMessage('editMessage')
  async editMessage(@MessageBody() messageDto: MessageDto) {
    await this.socketGatewayService.editMessage(messageDto);
    this.server.emit('createdMessage', {
      userTo: messageDto.userTo,
      userFrom: messageDto.userFrom,
      messageText: messageDto.messageText,
    });
  }

  @SubscribeMessage('chatCreate')
  async chatCreate(@MessageBody() messageDto: MessageDto) {
    this.server.emit('chatCreated');
  }
}
