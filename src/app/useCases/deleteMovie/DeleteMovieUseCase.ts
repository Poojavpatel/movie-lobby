import { IMovieRepo } from "../../repos/MovieRepo";
import { Result } from "../../utils/Result";
import { Validate } from "../../utils/Validate";

export interface IDeleteMovieRequestDTO {
  movieId: string;
}

export class DeleteMovieUseCase {
  private movieRepo: IMovieRepo;

  constructor(movieRepo: IMovieRepo) {
    this.movieRepo = movieRepo;
  }

  public async execute(request: IDeleteMovieRequestDTO): Promise<Result<any>> {
    try {
      const {movieId} = request;
      
      /* validate movieId is a valid objectId */
      const check = Validate.againstInvalidObjectId(movieId, "movieId");
      if (!check.isValid) {
        return Result.validationFailed(check.message!);
      }

      const movie = await this.movieRepo.findMovieById(movieId);

      if(!movie){
        return Result.validationFailed(`No movie found with id ${movieId}`);
      }

      await this.movieRepo.deleteMovie(movieId);
      
      return Result.success({message: "Movie deleted successfully"});
    } catch (error) {
      return Result.failure(error);
    }
  }
}
