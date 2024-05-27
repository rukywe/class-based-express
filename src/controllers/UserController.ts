import { Request, Response } from 'express';
import { User } from '../models/User';
import { UserService } from '../services/UserService';

let users: User[] = [];
let nextId = 1;

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();

    this.getAllUsers = this.getAllUsers.bind(this);
    this.getUserById = this.getUserById.bind(this);
    this.createUser = this.createUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

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
    if (this.userService.validateUser(newUser)) {
      users.push(newUser);
      res.status(201).json(newUser);
    } else {
      res.status(400).send('Invalid user data');
    }
  }

  public deleteUser(req: Request, res: Response): void {
    const userId = parseInt(req.params.id);
    users = users.filter((u) => u.id !== userId);
    res.status(204).send();
  }
}
