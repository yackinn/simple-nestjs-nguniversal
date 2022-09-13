import { SessionContext, User }     from '@nestjs-angular-talk/core/domain';
import { ExecutionContext, Logger } from '@nestjs/common';
import { Request }                  from 'express';
import { getRequest }               from '../request.utils';

export class SessionHandler {
  static for(requestOrContext: Request | ExecutionContext) {
    const request: Request = 'switchToHttp' in requestOrContext
      ? getRequest(requestOrContext)
      : requestOrContext;

    return new SessionHandler(request);
  }

  private readonly logger = new Logger(SessionHandler.name);

  constructor(private request: Request) {
    if (!request?.session?.context) request.session.context = {
      sessionState: {
        uiState: {
          isDarkTheme: false,
          isLoggedIn: false
        }
      }
    };
  }

  private get session() {
    return this.request.session;
  }

  get sessionId() {
    return this.session.id;
  }

  /**
   * Session Context
   * - the session context includes the session state
   */
  get sessionContext(): SessionContext {
    return this.request.session.context;
  }

  set sessionContext(context: Partial<SessionContext>) {
    this.request.session.context = { ...this.sessionContext, ...context };
  }

  /**
   * Session State
   */
  get sessionState(): SessionContext['sessionState'] {
    return this.sessionContext.sessionState;
  }

  set sessionState(state: Partial<SessionContext['sessionState']>) {
    this.request.session.context.sessionState = { ...this.sessionState, ...state };
  }

  get user(): User | undefined {
    return this.sessionContext.sessionState.user;
  }

  isAuthenticated(): boolean {
    return this.request.isAuthenticated();
  }

  destroy() {
    this.session.destroy(err => console.log(err));
  }
}
