import express from "express";

const appRouter = express.Router();

appRouter.get("/", (req, res) => res.json({ message: "Movie lobby" }));
appRouter.get("/movies", (req, res) => res.json({ message: "List of movies" }));

export { appRouter };
