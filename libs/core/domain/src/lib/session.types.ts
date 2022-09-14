import { User } from './user.interface';

export interface SessionContext {
  sessionState: SessionState;
  serverData?: any;
}

export interface UiState {
  isDarkTheme?: boolean;
}

export interface SessionState {
  uiState: UiState;
  user?: User;
}
