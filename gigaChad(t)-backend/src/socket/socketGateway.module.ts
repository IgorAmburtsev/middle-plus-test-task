import { Module } from '@nestjs/common';
import { SocketGateway } from './socketGateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat, Message, User } from '@entities/index';
import { SocketGatewayService } from './socketGateway.service';
import { UsersService } from 'users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, Message, User], 'gigaChat')],
  providers: [SocketGateway, SocketGatewayService, UsersService],
})
export class SocketGatewayModule {}
