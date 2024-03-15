import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@entities/index';
import { UserDto } from '@dto/index';
import { Raw, Repository } from 'typeorm';

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

  async findUser(body: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.usertag ILIKE :body OR user.username ILIKE :body', {
        body,
      })
      .getMany();
    return user;
  }
}
