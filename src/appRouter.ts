import express from "express";
import { listMoviesRouter } from "./app/useCases/listMovies/ListMoviesRouter";

const appRouter = express.Router();

appRouter.get("/", (req, res) => res.json({ message: "Movie lobby" }));
appRouter.get("/movies", (req, res) => listMoviesRouter.execute(req, res));

export { appRouter };
