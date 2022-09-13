import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable }                                                 from 'rxjs';
import { SessionHandler }                                             from '../session/session-handler';

@Injectable()
export class InitSessionInterceptor implements NestInterceptor {

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const sessionHandler = SessionHandler.for(context);

    return next.handle();
  }

}
