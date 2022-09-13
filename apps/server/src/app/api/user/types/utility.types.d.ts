import { User as IUser } from '../models/user.entity';

declare global {
  namespace Express {
    export interface Request {
      user?: IUser;
    }
  }
}
