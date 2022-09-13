import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { SessionHandler }                         from './session-handler';

export const Session = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): SessionHandler => SessionHandler.for(ctx)
);
