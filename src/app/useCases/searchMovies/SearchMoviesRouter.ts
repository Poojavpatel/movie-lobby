import express from "express";
import { SearchMoviesUseCase } from "./SearchMoviesUseCase";
import ApiResponse from "../../utils/ApiResponse";
import movieRepo from "../../repos/MovieRepo";

class SearchMoviesRouter {
  private useCase: SearchMoviesUseCase;

  constructor(useCase: SearchMoviesUseCase) {
    this.useCase = useCase;
  }

  public async execute(req: express.Request, res: express.Response) {
    try {
      const result = await this.useCase.execute();

      if (result.error) {
        ApiResponse.sendError(res, result.error);
      }

      ApiResponse.sendSuccess(res, result.value);
    } catch (err) {
      console.log("Error :", err);

      return res.status(500).json({
        message: "INTERNAL_SERVER_ERROR",
      });
    }
  }
}

const searchMoviesUseCase = new SearchMoviesUseCase(movieRepo);
const searchMoviesRouter = new SearchMoviesRouter(searchMoviesUseCase);

export { searchMoviesRouter };
