import { GenreEnum, IMoviePersistance } from "../../models/Movie";
import { IMovieRepo } from "../../repos/MovieRepo";
import { Result } from "../../utils/Result";
import { Validate } from "../../utils/Validate";

export interface IUpdateMovieRequestDTO {
  movieId: string;
  title?: string;
  genre?: string;
  rating?: number;
  streamingLink?: string;
}

export class UpdateMovieUseCase {
  private movieRepo: IMovieRepo;

  constructor(movieRepo: IMovieRepo) {
    this.movieRepo = movieRepo;
  }

  public async execute(request: IUpdateMovieRequestDTO): Promise<Result<any>> {
    try {
      const { movieId, title, genre, rating, streamingLink } = request;
      

      /* validate movieId is a valid objectId */
      const check = Validate.againstInvalidObjectId(movieId, "movieId");
      if (!check.isValid) {
        return Result.validationFailed(check.message!);
      }

      /* validate genre belongs to enum */
      if (genre) {
        const check = Validate.againstValidEnums(GenreEnum, genre);
        if (!check.isValid) {
          return Result.validationFailed(check.message!);
        }
      }

      if(!(title || genre || rating || streamingLink)) {
        return Result.validationFailed("Atleast one field is required");
      }

      const movie = await this.movieRepo.findMovieById(movieId);

      if(!movie){
        return Result.validationFailed(`No movie found with id ${movieId}`);
      }

      const updateFields:Partial<IMoviePersistance>  = {};
      title && (updateFields.title = title);
      genre && (updateFields.genre = genre);
      rating && (updateFields.rating = rating);
      streamingLink && (updateFields.streamingLink = streamingLink);

      await this.movieRepo.updateMovie(movieId, updateFields);
      
      return Result.success({message: "Movie updated successfully"});
    } catch (error) {
      return Result.failure(error);
    }
  }
}
