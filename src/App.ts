import express, { Application } from 'express';
import bodyParser from 'body-parser';

export class App {
  public app: Application;

  constructor() {
    this.app = express();
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
  }
}
