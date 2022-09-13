import { Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { SessionHandler }                        from '../../../shared/session/session-handler';
import { Session }                               from '../../../shared/session/session.decorator';
import { toResponse }                            from '../../../shared/to-response.util';
import { UserResponse }                          from '../../user/webservice/dto/user.response';
import { AuthService }                           from '../auth.service';
import { LocalAuthGuard }                        from '../guards/local-auth.guard';
import { SessionGuard }                          from '../guards/session.guard';

@Controller('api/auth')
export class AuthController {

  constructor(
    private authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Session() session: SessionHandler): Promise<UserResponse> {
    session.sessionState.uiState.isLoggedIn = true;
    return toResponse(UserResponse, session.user);
  }

  @UseGuards(SessionGuard)
  @HttpCode(204)
  @Post('logout')
  async logout(@Session() session: SessionHandler): Promise<void> {
    session.destroy();
  }

}
