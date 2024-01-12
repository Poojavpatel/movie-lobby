import { IMovieModel, IMoviePersistance, movieModel } from "../models/Movie";

export interface IMovieRepo {
  getAllMovies(): Promise<any[]>;
  addMovie(movie: IMoviePersistance): Promise<void>;
}

class MovieRepo implements IMovieRepo {
  private movieModel: IMovieModel;

  constructor(movieModel: IMovieModel) {
    this.movieModel = movieModel;
  }

  public async addMovie(movie: IMoviePersistance): Promise<void> {
    await this.movieModel.insertMany([movie]);
  }

  public async getAllMovies(): Promise<any[]> {
    const rawData = await this.movieModel.find();
    return rawData;
  }
}

const movieRepo = new MovieRepo(movieModel);
export default movieRepo;
