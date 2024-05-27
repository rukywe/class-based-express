import { App } from './app';

class Server {
  private app: App;

  constructor() {
    this.app = new App();
  }

  public start(): void {
    const PORT = process.env.PORT || 3000;
    this.app.app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
}

const server = new Server();
server.start();
