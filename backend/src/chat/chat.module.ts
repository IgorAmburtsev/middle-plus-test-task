import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Chat } from '@entities/index';
@Module({
  imports: [TypeOrmModule.forFeature([User, Chat], 'gigaChat')],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
