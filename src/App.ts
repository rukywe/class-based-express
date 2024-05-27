import express, { Application } from 'express';
import bodyParser from 'body-parser';
import { UserController } from './controllers/UserController';

export class App {
  public app: Application;
  private userController: UserController;

  constructor() {
    this.app = express();
    this.userController = new UserController();
    this.config();
    this.routes();
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  private routes(): void {
    this.app.get('/', (req, res) => {
      res.send('Hello World!');
    });

    this.app.get('/users', this.userController.getAllUsers);
    this.app.get('/users/:id', this.userController.getUserById);
  }
}
