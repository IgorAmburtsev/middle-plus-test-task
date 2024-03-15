import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@entities/index';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User], 'gigaChat')],
  providers: [UsersService],
})
export class UsersModule {}
