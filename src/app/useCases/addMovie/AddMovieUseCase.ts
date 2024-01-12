import { GenreEnum, IMoviePersistance } from "../../models/Movie";
import { IMovieRepo } from "../../repos/MovieRepo";
import { Result } from "../../utils/Result";
import { Validate } from "../../utils/Validate";

export interface IAddMovieRequestDTO {
  title: string;
  genre?: string;
  rating?: number;
  streamingLink?: string;
}

export class AddMovieUseCase {
  private movieRepo: IMovieRepo;

  constructor(movieRepo: IMovieRepo) {
    this.movieRepo = movieRepo;
  }

  public async execute(request: IAddMovieRequestDTO): Promise<Result<any>> {
    try {
      const { title, genre, rating, streamingLink } = request;

      /* Validation checks */
      if (!title) {
        return Result.validationFailed("Title is required");
      }

      if (genre) {
        const check = Validate.againstValidEnums(GenreEnum, genre);
        if (!check.isValid) {
          return Result.validationFailed(check.message!);
        }
      }

      const newMovieRaw: IMoviePersistance = {
        title,
        genre,
        rating,
        streamingLink
      };

      await this.movieRepo.addMovie(newMovieRaw);

      return Result.success({message: "Movie added successfully"});
    } catch (error) {
      return Result.failure(error);
    }
  }
}
