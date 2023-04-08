import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

export enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

type HTTPErrorCode =
  | "validation_error"
  | "bad_request"
  | "internal_server_error";

export class HTTPError extends Error {
  public code: HTTPErrorCode;
  public statusCode: HttpStatusCode;
  public message: string;
  public isOperational: boolean;

  constructor(
    code?: HTTPErrorCode,
    message?: string,
    statusCode?: HttpStatusCode,
    isOperational?: boolean
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);

    this.code = code || "internal_server_error";
    this.message = message || "Internal server error.";
    this.statusCode = statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR;
    this.isOperational = isOperational || false;

    Error.captureStackTrace(this);
  }
}

export interface IHTTPError extends Partial<Error> {
  status?: "error";
  code?: string;
  message: string;
  statusCode?: number;
}

const errorMiddleware =
  (): ErrorRequestHandler =>
  async (err: IHTTPError, req: Request, res: Response, _: NextFunction) => {
    let errorObject: IHTTPError = {
      status: "error",
      code: "bad_request",
      message: "Internal server error.",
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
    };

    if (err.code) {
      errorObject.code = err.code;
      errorObject.message = err.message;
      errorObject.status = err.status;

      return res.status(err.statusCode || 400).send(errorObject);
    }
    return res.status(500).send(errorObject);
  };

export default errorMiddleware;
