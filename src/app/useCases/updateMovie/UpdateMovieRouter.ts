import express from "express";
import {
  UpdateMovieUseCase,
  IUpdateMovieRequestDTO
} from "./UpdateMovieUseCase";
import ApiResponse from "../../utils/ApiResponse";
import movieRepo from "../../repos/MovieRepo";

class UpdateMovieRouter {
  private useCase: UpdateMovieUseCase;

  constructor(useCase: UpdateMovieUseCase) {
    this.useCase = useCase;
  }

  public async execute(req: express.Request, res: express.Response) {
    try {
      const dto: IUpdateMovieRequestDTO = {
        movieId: req.params?.id,
        title: req.body?.title,
        genre: req.body?.genre,
        rating: req.body?.rating,
        streamingLink: req.body?.streamingLink
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

const updateMovieUseCase = new UpdateMovieUseCase(movieRepo);
const updateMovieRouter = new UpdateMovieRouter(updateMovieUseCase);

export { updateMovieRouter };
