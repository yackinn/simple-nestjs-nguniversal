import { ExecutionContext } from '@nestjs/common';
import { Request, Response } from 'express';

export function getRequest(context: ExecutionContext): Request {
  return context.switchToHttp().getRequest();
}

export function getResponse(context: ExecutionContext): Response | undefined {
  return getRequest(context).res;
}
