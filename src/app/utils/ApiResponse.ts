import { COMMON_ERROR_TYPES } from "./ErrorCodes";

class ApiResponse<T> {
  public static sendSuccess(res: any, data?: any) {
    res.type("application/json");
    res.status(200).json(data || {});
    return;
  }

  public static sendError(res: any, error: any) {
    if (error.type === COMMON_ERROR_TYPES.INVALID_REQUEST) {
      return res
        .status(409)
        .json({ error: "Invalid request", body: error.body });
    }
    if (error.type === COMMON_ERROR_TYPES.FORBIDDEN) {
      return res.status(403).json({ error: "Forbidden", body: error.body });
    }
    return res
      .status(500)
      .json({ error: "Internal server error", body: error.body });
  }
}

export default ApiResponse;
