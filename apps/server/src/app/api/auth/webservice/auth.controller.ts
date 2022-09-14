import { Controller, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { Request }                                    from 'express';
import { SessionHandler }                             from '../../../shared/session/session-handler';
import { Session }                                    from '../../../shared/session/session.decorator';
import { toResponse }                                 from '../../../shared/to-response.util';
import { UserResponse }                               from '../../user/webservice/dto/user.response';
import { LocalAuthGuard }                             from '../guards/local-auth.guard';
import { SessionGuard }                               from '../guards/session.guard';

@Controller('api/auth')
export class AuthController {

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Session() session: SessionHandler,
    @Req() request: Request
  ): Promise<UserResponse> {
    session.user = toResponse(UserResponse, request.user);
    console.log('user set in session', session.sessionState);

    return session.user;
  }

  // @UseGuards(SessionGuard)
  @HttpCode(204)
  @Post('logout')
  async logout(@Session() session: SessionHandler): Promise<void> {
    session.destroy();
  }

}
