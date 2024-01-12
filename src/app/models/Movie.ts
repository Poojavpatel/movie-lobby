import { Model, Schema, model } from "mongoose";

export interface IMovie extends Document {
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export type IMovieModel = Model<IMovie>;

const MovieSchema: Schema = new Schema(
  {
    title: { type: Schema.Types.String, required: true },
  },
  { timestamps: true }
);

// TODO : add indexes if needed

export const movieModel: IMovieModel = model<IMovie, IMovieModel>(
  "Movie",
  MovieSchema
);

export default movieModel;
