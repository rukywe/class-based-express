import { Request, Response } from 'express';

export class UserController {
  public getAllUsers(req: Request, res: Response): void {
    res.send('Return all users');
  }

  public getUserById(req: Request, res: Response): void {
    const userId = req.params.id;
    res.send(`Return user with ID: ${userId}`);
  }
}
