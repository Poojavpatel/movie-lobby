class ApiResponse<T> {
  public static sendSuccess(res: any, data?: any) {
    res.type("application/json");
    res.status(200).json(data || {});
  }

  public static sendError(res: any, error: any) {
    if (error.type === "CustomError") {
      res.status(409).json({ error: "Custom error", body: error.body });
    } else if (error.type === "UnauthorizedAccessError") {
      res.status(403).json({ error: "Forbidden", body: error.body });
    } else {
      res
        .status(500)
        .json({ error: "Internal server error", body: error.body });
    }
  }
}

export default ApiResponse;
