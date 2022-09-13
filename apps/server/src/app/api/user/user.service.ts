import { forwardRef, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { EntityNotFoundError }                                       from 'typeorm';
import {
  FindOneOptions
}                                                                    from 'typeorm/find-options/FindOneOptions';
import { AuthService }                                               from '../auth/auth.service';
import { User }                                                      from './models/user.entity';
import { UserRepository }                                            from './user.repository';
import { CreateUserDto }                                             from './webservice/dto/user.dtos';

@Injectable()
export class UserService {
  logger = new Logger(UserService.name);

  constructor(
    private readonly userRepository: UserRepository,
    @Inject(forwardRef(() => AuthService)) private authService: AuthService,
  ) {
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user    = this.userRepository.create(createUserDto);
    user.password = await this.authService.hashPassword(createUserDto.password);

    await this.userRepository.save(user);
    return user;
  }

  async findOneUser(where: FindOneOptions<User>['where']): Promise<User> {
    try {
      return await this.userRepository.findOneOrFail({ where });
    } catch (err) {
      if (err instanceof EntityNotFoundError) throw new NotFoundException();
    }
  }

}

