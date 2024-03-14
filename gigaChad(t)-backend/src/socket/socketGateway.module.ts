import { Module } from '@nestjs/common';
import { SocketGateway } from './socketGateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat, Message, User } from '@entities/index';
import { SocketGatewayService } from './socketGateway.service';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, Message, User], 'gigaChat')],
  providers: [SocketGateway, SocketGatewayService],
})
export class SocketGatewayModule {}
