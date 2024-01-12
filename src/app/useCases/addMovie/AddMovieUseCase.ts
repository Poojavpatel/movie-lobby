import { GenreEnum, IMoviePersistance } from "../../models/Movie";
import { IMovieRepo } from "../../repos/MovieRepo";
import { COMMON_ERROR_CODES } from "../../utils/ErrorCodes";
import { Result } from "../../utils/Result";
import { Validate } from "../../utils/Validate";
import * as _ from "lodash";

export interface IAddMovieRequestDTO {
  // userId: string;
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
          return Result.failure(check.message);
        }
      }

      // TODO : validate user role

      const newMovieRaw: IMoviePersistance = {
        title,
        genre,
        rating,
        streamingLink,
      };

      const newMovie = this.movieRepo.addMovie(newMovieRaw);

      return Result.success("Movie added successfully");
    } catch (error) {
      return Result.failure(error);
    }
  }
}
