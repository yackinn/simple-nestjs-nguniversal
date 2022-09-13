import { Logger }           from '@nestjs/common';
import { BaseRepository }   from '../../shared/orm/base.repository';
import { CustomRepository } from '../../shared/orm/custom-repository.decorator';
import { User }             from './models/user.entity';
import { UpdateUserDto }    from './webservice/dto/user.dtos';

@CustomRepository(User)
export class UserRepository extends BaseRepository<User, UpdateUserDto> {
  protected override logger     = new Logger(UserRepository.name);
  protected override entityType = User;
}
