import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@entities/index';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User], 'gigaChat')],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
