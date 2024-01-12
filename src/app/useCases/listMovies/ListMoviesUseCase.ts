import { IMovieRepo } from "../../repos/MovieRepo";
import { Result } from "../../utils/Result";

interface IResult {
  error?: { type: string } | any;
  value?: any;
}

export class ListMoviesUseCase {
  private movieRepo: IMovieRepo;

  constructor(movieRepo: IMovieRepo) {
    this.movieRepo = movieRepo;
  }

  public async execute(): Promise<IResult> {
    try {
      const movies = this.movieRepo.getAllMovies();
      return Result.success(movies);
    } catch (error) {
      return Result.failure(error);
    }
  }
}
