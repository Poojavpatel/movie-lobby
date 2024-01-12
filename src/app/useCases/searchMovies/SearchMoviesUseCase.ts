import { IMovieRepo } from "../../repos/MovieRepo";
import { Result } from "../../utils/Result";

export interface ISearchMovieRequestDTO {
  searchTerm: string;
}

export class SearchMoviesUseCase {
  private movieRepo: IMovieRepo;

  constructor(movieRepo: IMovieRepo) {
    this.movieRepo = movieRepo;
  }

  public async execute(request: ISearchMovieRequestDTO): Promise<Result<any>> {
    try {
      const {searchTerm} = request;

      if(!searchTerm){
        return Result.validationFailed('query is empty');
      }

      const movies = await this.movieRepo.findMoviesByTitleOrGenre(searchTerm);
      return Result.success(movies);
    } catch (error) {
      return Result.failure(error);
    }
  }
}
