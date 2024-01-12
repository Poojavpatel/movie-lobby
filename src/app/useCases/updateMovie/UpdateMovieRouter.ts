import express from "express";
import { UpdateMovieUseCase } from "./UpdateMovieUseCase";
import ApiResponse from "../../utils/ApiResponse";
import movieRepo from "../../repos/MovieRepo";

class UpdateMovieRouter {
  private useCase: UpdateMovieUseCase;

  constructor(useCase: UpdateMovieUseCase) {
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

const updateMovieUseCase = new UpdateMovieUseCase(movieRepo);
const updateMovieRouter = new UpdateMovieRouter(updateMovieUseCase);

export { updateMovieRouter };
