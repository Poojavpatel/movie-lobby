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
      ApiResponse.sendError(res, err);
    }
  }
}

const searchMoviesUseCase = new SearchMoviesUseCase(movieRepo);
const searchMoviesRouter = new SearchMoviesRouter(searchMoviesUseCase);

export { searchMoviesRouter };
