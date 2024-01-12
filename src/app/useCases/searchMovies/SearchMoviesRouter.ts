import express from "express";
import { ISearchMovieRequestDTO, SearchMoviesUseCase } from "./SearchMoviesUseCase";
import ApiResponse from "../../utils/ApiResponse";
import movieRepo from "../../repos/MovieRepo";

class SearchMoviesRouter {
  private useCase: SearchMoviesUseCase;

  constructor(useCase: SearchMoviesUseCase) {
    this.useCase = useCase;
  }

  public async execute(req: express.Request, res: express.Response) {
    try {
      const dto: ISearchMovieRequestDTO = {
        searchTerm: req.query?.q as string
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

const searchMoviesUseCase = new SearchMoviesUseCase(movieRepo);
const searchMoviesRouter = new SearchMoviesRouter(searchMoviesUseCase);

export { searchMoviesRouter };
