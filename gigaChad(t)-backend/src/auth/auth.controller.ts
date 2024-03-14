import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Get,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthDto, UserDto } from '@dto/index';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Body() userDto: UserDto) {
    const hashedPass = await bcrypt.hash(userDto.password, 10);
    const { password, ...result } = this.authService.register({
      ...userDto,
      password: hashedPass,
    });
    return result;
  }

  @Post('login')
  async login(
    @Body() authDto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const validatedUser = await this.authService.valdateUser(authDto);
    if (!validatedUser) throw new BadRequestException('Invalid Credentials');

    const token = await this.jwtService.signAsync({
      usertag: validatedUser.usertag,
    });

    res.cookie('token', token, { httpOnly: true });
    return {
      response: 'success',
    };
  }

  @Get('user')
  async setUser(@Req() req: Request) {
    try {
      const cookie = req.cookies['token'];

      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) throw new UnauthorizedException();

      const user = await this.authService.findUser(data.usertag);

      const { password, ...result } = user;

      return result;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token');
    return { response: 'success' };
  }
}
