import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable }                                from 'rxjs';
import { SessionHandler }                            from '../../../shared/session/session-handler';

@Injectable()
export class SessionGuard implements CanActivate {

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const sessionHandler = SessionHandler.for(context);

    return sessionHandler.isAuthenticated();
  }

}
