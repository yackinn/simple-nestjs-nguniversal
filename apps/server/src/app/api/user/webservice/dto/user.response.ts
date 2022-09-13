import { ApiExpose } from '../../../../shared/api-expose.decorator';

export class UserResponse {
  @ApiExpose()
  id: string;

  @ApiExpose()
  email: string;

  @ApiExpose()
  firstName?: string;

  @ApiExpose()
  lastName?: string;
}

