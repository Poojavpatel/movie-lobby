import express from "express";
import { listMoviesRouter } from "./app/useCases/listMovies/ListMoviesRouter";
import { addMovieRouter } from "./app/useCases/addMovie/AddMovieRouter";
import { isAdmin } from "./middlewares/Auth";
import { deleteMovieRouter } from "./app/useCases/deleteMovie/DeleteMovieRouter";
import { updateMovieRouter } from "./app/useCases/updateMovie/UpdateMovieRouter";
import { searchMoviesRouter } from "./app/useCases/searchMovies/SearchMoviesRouter";

const appRouter = express.Router();

appRouter.get("/", (req, res) => res.json({ message: "Movie lobby" }));

/* List all movies */
appRouter.get("/movies", (req, res) => listMoviesRouter.execute(req, res));

/* Add a movie */
appRouter.post("/movies", isAdmin, (req, res) =>
  addMovieRouter.execute(req, res),
);

/* Update a movie */
appRouter.put("/movies/:id", isAdmin, (req, res) =>
  updateMovieRouter.execute(req, res),
);

/* Delete a movie */
appRouter.delete("/movies/:id", isAdmin, (req, res) =>
  deleteMovieRouter.execute(req, res),
);

/* Search by title or genre */
appRouter.get("/search", (req, res) => searchMoviesRouter.execute(req, res));

export { appRouter };
