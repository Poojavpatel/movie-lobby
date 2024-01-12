import express from "express";
import { Result } from "../app/utils/Result";
import ApiResponse from "../app/utils/ApiResponse";

const isAdmin = (
  req: express.Request,
  res: express.Response,
  next: () => any
) => {
  /* Temporary check, replace with logic according to needs */
  const isAdminUser = req.headers.authorization == "adminToken";

  if (isAdminUser) {
    return next();
  } else {
    const result = Result.authFailed("Only Admins can access this route");
    return ApiResponse.sendError(res, result.error);
  }
};

export { isAdmin };
