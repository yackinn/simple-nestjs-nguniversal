import { forwardRef, Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import * as bcrypt                                                       from 'bcrypt';
import { User }                                                          from '../user/models/user.entity';
import { UserService }                                                   from '../user/user.service';

@Injectable()
export class AuthService {
  logger = new Logger(AuthService.name);

  constructor(
    @Inject(forwardRef(() => UserService)) private readonly userService: UserService
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async validateHashedPassword(password: string, userPassword: string): Promise<boolean> {
    return bcrypt.compare(password, userPassword);
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findOneUser({ email });

    if (!user) {
      this.logger.log('User doesn\'t exist');
      throw new UnauthorizedException();
    }

    if (!(await this.validateHashedPassword(password, user.password))) {
      this.logger.log('Password wrong');
      throw new UnauthorizedException();
    }

    return user;
  }

}
