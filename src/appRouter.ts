import express from "express";
import { listMoviesRouter } from "./app/useCases/listMovies/ListMoviesRouter";
import { addMovieRouter } from "./app/useCases/addMovie/AddMovieRouter";

const appRouter = express.Router();

appRouter.get("/", (req, res) => res.json({ message: "Movie lobby" }));
appRouter.get("/movies", (req, res) => listMoviesRouter.execute(req, res));
appRouter.post("/movies", (req, res) => addMovieRouter.execute(req, res));
appRouter.put("/movies/:id", (req, res) => addMovieRouter.execute(req, res));
appRouter.get("/search", (req, res) => listMoviesRouter.execute(req, res));

export { appRouter };
