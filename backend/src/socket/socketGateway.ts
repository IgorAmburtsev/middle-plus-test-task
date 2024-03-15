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
import { UsersService } from 'users/users.service';

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
    private readonly usersService: UsersService,
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
    const message = await this.socketGatewayService.sendMessage(messageDto);
    return message;
  }
  @SubscribeMessage('findUser')
  async findUser(@MessageBody() body: string) {
    const user = await this.usersService.findUser(body);
    return user;
  }
}
