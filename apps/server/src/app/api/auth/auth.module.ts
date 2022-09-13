import { forwardRef, Module } from '@nestjs/common';
import { PassportModule }     from '@nestjs/passport';
import { UserModule }         from '../user/user.module';
import { AuthService }        from './auth.service';
import { SessionSerializer }  from './session.serializer';
import { LocalStrategy }      from './strategies/local.strategy';

import { AuthController } from './webservice/auth.controller';

@Module({
  controllers: [AuthController],
  imports: [
    PassportModule.register({ session: true }),
    forwardRef(() => UserModule)
  ],
  providers: [
    LocalStrategy,
    AuthService,
    SessionSerializer
  ],
  exports: [AuthService, LocalStrategy],
})
export class AuthModule {}
