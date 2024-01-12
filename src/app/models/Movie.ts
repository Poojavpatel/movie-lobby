import { Model, Schema, model } from "mongoose";
import Helper from "../utils/helper";

export interface IMovie extends Document {
  title: string;
  genre: string;
  rating: number;
  streamingLink: string;
  createdAt: Date;
  updatedAt: Date;
}

export type IMovieModel = Model<IMovie>;

export enum GenreEnum {
  COMEDY = "COMEDY",
  ACTION = "ACTION",
  ROMANCE = "ROMANCE",
  HORROR = "HORROR",
}

const MovieSchema: Schema = new Schema(
  {
    title: { type: Schema.Types.String, required: true },
    genre: { type: Schema.Types.String, enum: Helper.enumValues(GenreEnum) },
    rating: { type: Schema.Types.Number },
    streamingLink: { type: Schema.Types.String },
  },
  { timestamps: true }
);

// TODO : add indexes if needed

export const movieModel: IMovieModel = model<IMovie, IMovieModel>(
  "Movie",
  MovieSchema
);

export default movieModel;
