import { User } from '../models/User';

export class UserService {
  public validateUser(user: User): boolean {
    if (!user.name || !user.email) {
      return false;
    }
    return true;
  }
}
