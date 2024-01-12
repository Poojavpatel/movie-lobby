import express from "express";
import { DeleteMovieUseCase } from "./DeleteMovieUseCase";
import ApiResponse from "../../utils/ApiResponse";
import movieRepo from "../../repos/MovieRepo";

class DeleteMovieRouter {
  private useCase: DeleteMovieUseCase;

  constructor(useCase: DeleteMovieUseCase) {
    this.useCase = useCase;
  }

  public async execute(req: express.Request, res: express.Response) {
    try {
      const result = await this.useCase.execute();

      if (result.error) {
        ApiResponse.sendError(res, result.error);
      }

      ApiResponse.sendSuccess(res, result.value);
    } catch (err) {
      console.log("Error :", err);

      return res.status(500).json({
        message: "INTERNAL_SERVER_ERROR",
      });
    }
  }
}

const deleteMovieUseCase = new DeleteMovieUseCase(movieRepo);
const deleteMovieRouter = new DeleteMovieRouter(deleteMovieUseCase);

export { deleteMovieRouter };
