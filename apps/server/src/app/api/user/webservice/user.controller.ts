import { Body, Controller, Get, Post, UseGuards, } from '@nestjs/common';
import { SessionUser }                             from '../../../shared/session/session-user.decorator';
import { toResponse }                              from '../../../shared/to-response.util';
import { SessionGuard }                            from '../../auth/guards/session.guard';
import { User }                                    from '../models/user.entity';

import { UserService }   from '../user.service';
import { CreateUserDto } from './dto/user.dtos';
import { UserResponse }  from './dto/user.response';

@Controller('api/users')
export class UserController {

  constructor(
    private readonly userService: UserService,
  ) {
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<UserResponse> {
    const user = await this.userService.createUser(createUserDto);

    return toResponse(UserResponse, user);
  }

  @UseGuards(SessionGuard)
  @Get('profile')
  async getProfile(@SessionUser() user: User): Promise<UserResponse> {
    return toResponse(UserResponse, user);
  }

}
