import { IUserResponse } from '@nestjs-angular-talk/core/domain';
import { ApiExpose }     from '../../../../shared/api-expose.decorator';

export class UserResponse implements IUserResponse{
  @ApiExpose()
  id: string;

  @ApiExpose()
  email: string;

  @ApiExpose()
  firstName?: string;

  @ApiExpose()
  lastName?: string;
}

