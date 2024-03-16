import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@entities/index';
import { UserDto } from '@dto/index';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User, 'gigaChat')
    private readonly userRepository: Repository<User>,

  ) {}

  async createUser(userDto: UserDto) {
    const user = this.userRepository.save(userDto);
    return user;
  }

  async findAllUsers() {
    const users = await this.userRepository.find({
      select: ['username', 'usertag'],
    })
    return users
  }    
}
