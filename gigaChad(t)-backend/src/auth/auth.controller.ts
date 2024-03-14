import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthDto, UserDto } from '@dto/index';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() userDto: UserDto) {
    const hashedPass = await bcrypt.hash(userDto.password, 10);
    return this.authService.register({ ...userDto, password: hashedPass });
  }

  @Post('login')
  async login(@Body() authDto: AuthDto) {
    const validatedUser = await this.authService.valdateUser(authDto);
    if (validatedUser === null)
      throw new BadRequestException('Invalid Credentials');
    return validatedUser;
  }
}
