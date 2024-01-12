import { IMovieModel, IMoviePersistance, movieModel } from "../models/Movie";

export interface IMovieRepo {
  getAllMovies(): Promise<any[]>;
  addMovie(movie: IMoviePersistance): Promise<void>;
  findMovieById(id: string): Promise<any>;
  updateMovie(id: string, movie: Partial<IMoviePersistance>): Promise<void>;
  deleteMovie(id: string): Promise<void>;
  findMoviesByTitleOrGenre(searchTerm: string): Promise<any>;
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

  public async findMovieById(id: string): Promise<any> {
    const rawData = await this.movieModel.findById(id);
    return rawData;
  }

  public async updateMovie(id: string, movie: Partial<IMoviePersistance>): Promise<void> {
    await this.movieModel.updateOne({_id: id}, {update: movie})
  }

  public async deleteMovie(id: string): Promise<void> {
    await this.movieModel.deleteOne({_id: id})
  }

  public async findMoviesByTitleOrGenre(searchTerm: string): Promise<any> {
    const rawData = await this.movieModel.find({
      $or: [
        { title: { $regex: searchTerm, $options: 'i' } },
        { genre: { $regex: searchTerm, $options: 'i' } },
      ],
    });

    return rawData
  }
}

const movieRepo = new MovieRepo(movieModel);
export default movieRepo;
