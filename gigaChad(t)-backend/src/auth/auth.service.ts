import { Injectable } from '@nestjs/common';
import { AuthDto } from '@dto/index';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@entities/index';
import { UserDto } from '@dto/index';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User, 'gigaChat')
    private readonly userRepository: Repository<User>,
  ) {}
  async valdateUser({ username, password }: AuthDto) {
    const findUser = await this.userRepository.findOne({
      select: ['username', 'password'],
      where: { username: username },
    });

    if (!findUser) return;

    if (!(await bcrypt.compare(password, findUser.password))) {
      return;
    }

    return findUser;
  }

  async register(userDto: UserDto) {
    return this.userRepository.save(userDto);
  }

  async findUser(body: string) {
    return await this.userRepository.findOne({
      where: {
        usertag: body,
      },
    });
  }
}
