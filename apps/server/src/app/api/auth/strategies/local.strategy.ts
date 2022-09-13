import { Injectable, Logger }                from '@nestjs/common';
import { PassportStrategy }                  from '@nestjs/passport';
import { Strategy as PassportLocalStrategy } from 'passport-local';
import { User }                              from '../../user/models/user.entity';
import { AuthService }                       from '../auth.service';

/**
 * Check valid credentials
 * - attach user with created token to request.user
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(PassportLocalStrategy) {
  logger = new Logger(LocalStrategy.name);

  // name   = 'local';

  constructor(
    private authService: AuthService
  ) {
    super({
      usernameField: 'email'
    });
  }

  // whatever is returned will be attached to request.user
  public async validate(email: string, password: string): Promise<User> {
    const result = await this.authService.validateUser(email, password);
    return result;
  }

}

