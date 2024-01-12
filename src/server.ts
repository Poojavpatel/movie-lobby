import bodyParser from "body-parser";
import express from "express";
import { appRouter } from "./appRouter";
import mongoose from "mongoose";

class AppServer {
  private port: string | number;
  private defaultPort = 8080;
  private _app: express.Application;

  constructor() {
    this.port = process.env.PORT || this.defaultPort;
    this._app = express();
    this.config();
    this.dbConnection();
    this.routes();
  }

  private config() {
    this._app.use(
      bodyParser.json({
        type: "application/json",
      })
    );
  }

  private async dbConnection() {
    /* Todo : Read db credentials from env variables */
    const mongoURI = `mongodb://127.0.0.1:27017/lobby`;
    const connectOptions: mongoose.ConnectOptions = {};

    try {
      await mongoose.connect(mongoURI, connectOptions);
      console.log("Successfully connected to mongodb");
    } catch (error) {
      console.log("Error connecting to mongodb", error);
    }
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
    this._app.use("/", appRouter);
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
