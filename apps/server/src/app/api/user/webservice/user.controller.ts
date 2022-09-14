import { Body, Controller, Get, Post, UseGuards, } from '@nestjs/common';
import { SessionHandler }                          from '../../../shared/session/session-handler';
import { SessionUser }                             from '../../../shared/session/session-user.decorator';
import { Session }                                 from '../../../shared/session/session.decorator';
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
  async register(
    @Body() createUserDto: CreateUserDto,
    @Session() session: SessionHandler
  ): Promise<UserResponse> {
    const user   = await this.userService.createUser(createUserDto);
    session.user = toResponse(UserResponse, user);
    console.log('register - is logged in set', session.sessionState);

    return session.user;
  }

  @UseGuards(SessionGuard)
  @Get('profile')
  async getProfile(@SessionUser() user: User): Promise<UserResponse> {
    return toResponse(UserResponse, user);
  }

}
