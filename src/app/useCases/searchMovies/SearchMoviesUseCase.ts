import { IMovieRepo } from "../../repos/MovieRepo";
import { Result } from "../../utils/Result";

export class SearchMoviesUseCase {
  private movieRepo: IMovieRepo;

  constructor(movieRepo: IMovieRepo) {
    this.movieRepo = movieRepo;
  }

  public async execute(): Promise<Result<any>> {
    try {
      const movies = await this.movieRepo.getAllMovies();
      return Result.success(movies);
    } catch (error) {
      return Result.failure(error);
    }
  }
}
