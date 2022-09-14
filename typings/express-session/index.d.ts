import 'express-session';
import { SessionContext } from '../../libs/core/domain/src';

declare module 'express-session' {
  interface SessionData {
    context: SessionContext;
  }
}

