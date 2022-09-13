import { forwardRef, Module } from '@nestjs/common';
import { BaseTypeormModule }  from '../../shared/orm/base-typeorm.module';
import { AuthModule }         from '../auth/auth.module';
import { UserRepository }     from './user.repository';

import { UserService }    from './user.service';
import { UserController } from './webservice/user.controller';

@Module({
  controllers: [UserController],
  imports: [
    BaseTypeormModule.forCustomRepository([UserRepository]),
    forwardRef(() => AuthModule),
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
