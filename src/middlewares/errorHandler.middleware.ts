import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

const excludedErrors = [
  { status: 401, message: "No authorization token was found" },
];

function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(error.status || httpStatus.INTERNAL_SERVER_ERROR);
  const response: {
    status: number;
    message: string;
    errorCode?: number;
  } = {
    status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
    message: error.message || httpStatus["500"],
    errorCode: error.errorCode || 0,
  };
  res.send(response);


  const isExcluded = excludedErrors.some(
    (excludedError) =>
      error.status === excludedError.status &&
      error.message === excludedError.message
  );

  if (isExcluded) {
    return;
  }
}

export default errorHandler;
