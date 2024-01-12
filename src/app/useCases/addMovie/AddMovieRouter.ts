import express from "express";
import { AddMovieUseCase, IAddMovieRequestDTO } from "./AddMovieUseCase";
import ApiResponse from "../../utils/ApiResponse";
import movieRepo from "../../repos/MovieRepo";

class AddMovieRouter {
  private useCase: AddMovieUseCase;

  constructor(useCase: AddMovieUseCase) {
    this.useCase = useCase;
  }

  public async execute(req: express.Request, res: express.Response) {
    try {
      const dto: IAddMovieRequestDTO = {
        title: req.body?.title,
        genre: req.body?.genre,
        rating: req.body?.rating,
        streamingLink: req.body?.streamingLink,
      };

      const result = await this.useCase.execute(dto);

      if (result.error) {
        return ApiResponse.sendError(res, result.error);
      }

      return ApiResponse.sendSuccess(res, result.value);
    } catch (err) {
      ApiResponse.sendError(res, err);
    }
  }
}

const addMovieUseCase = new AddMovieUseCase(movieRepo);
const addMovieRouter = new AddMovieRouter(addMovieUseCase);

export { addMovieRouter };
