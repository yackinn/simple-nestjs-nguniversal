import { User }                                   from '@nestjs-angular-talk/core/domain';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { SessionHandler }                         from './session-handler';

export const SessionUser = createParamDecorator((data: unknown, ctx: ExecutionContext): User => {
  const sessionHandler = SessionHandler.for(ctx);

  return sessionHandler.user;
});
