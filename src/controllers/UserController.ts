import { Request, Response } from 'express';
import { User } from '../models/User';

let users: User[] = [];
let nextId = 1;
export class UserController {
  public getAllUsers(req: Request, res: Response): void {
    res.json(users);
  }

  public getUserById(req: Request, res: Response): void {
    const userId = parseInt(req.params.id);
    const user = users.find((u) => u.id === userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  }

  public createUser(req: Request, res: Response): void {
    const newUser: User = {
      id: nextId++,
      name: req.body.name,
      email: req.body.email
    };
    users.push(newUser);
    res.status(201).json(newUser);
  }

  public deleteUser(req: Request, res: Response): void {
    const userId = parseInt(req.params.id);
    users = users.filter((u) => u.id !== userId);
    res.status(204).send();
  }
}
