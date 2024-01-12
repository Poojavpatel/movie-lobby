import express from "express";
import { DeleteMovieUseCase, IDeleteMovieRequestDTO } from "./DeleteMovieUseCase";
import ApiResponse from "../../utils/ApiResponse";
import movieRepo from "../../repos/MovieRepo";

class DeleteMovieRouter {
  private useCase: DeleteMovieUseCase;

  constructor(useCase: DeleteMovieUseCase) {
    this.useCase = useCase;
  }

  public async execute(req: express.Request, res: express.Response) {
    try {
      const dto: IDeleteMovieRequestDTO = {
        movieId: req.params?.id,
      };

      const result = await this.useCase.execute(dto);

      if (result.error) {
        return ApiResponse.sendError(res, result.error);
      }

      return ApiResponse.sendSuccess(res, result.value);
    } catch (err) {
      return ApiResponse.sendError(res, err);
    }
  }
}

const deleteMovieUseCase = new DeleteMovieUseCase(movieRepo);
const deleteMovieRouter = new DeleteMovieRouter(deleteMovieUseCase);

export { deleteMovieRouter };
