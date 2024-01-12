import express from "express";
import { ListMoviesUseCase } from "./ListMoviesUseCase";
import ApiResponse from "../../utils/ApiResponse";
import movieRepo from "../../repos/MovieRepo";

class ListMoviesRouter {
  private useCase: ListMoviesUseCase;

  constructor(useCase: ListMoviesUseCase) {
    this.useCase = useCase;
  }

  public async execute(req: express.Request, res: express.Response) {
    try {
      const result = await this.useCase.execute();

      if (result.error) {
        return ApiResponse.sendError(res, result.error);
      }

      return ApiResponse.sendSuccess(res, result.value);
    } catch (err) {
      return ApiResponse.sendError(res, err);
    }
  }
}

const listMoviesUseCase = new ListMoviesUseCase(movieRepo);
const listMoviesRouter = new ListMoviesRouter(listMoviesUseCase);

export { listMoviesRouter };
