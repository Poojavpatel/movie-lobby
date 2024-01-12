import bodyParser from "body-parser";
import express from "express";
import { appRouter } from "./appRouter";

class AppServer {
  private port: string | number;
  private defaultPort = 8080;
  private _app: express.Application;

  constructor() {
    this.port = process.env.PORT || this.defaultPort;
    this._app = express();
    this.config();
    this.routes();
  }

  private config() {
    this._app.use(
      bodyParser.json({
        type: "application/json",
      })
    );
  }

  private routes() {
    const router = express.Router();

    router.get("/", (req, res) =>
      res.json({ message: "Hello, welcome to Movie lobby!" })
    );

    router.get("/health-check", (req, res) =>
      res.json({ message: "All good!" })
    );

    this._app.use("/", router);
    this._app.use("/api", appRouter);
  }

  public listen() {
    this._app.listen(this.port, () => {
      console.log(`Server started on port ${this.port}`);
    });
  }

  public app() {
    return this._app;
  }
}

const appServer = new AppServer();
export { appServer };