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
  public status: HttpStatusCode;
  public message: string;
  public isOperational: boolean;

  constructor(
    code?: HTTPErrorCode,
    message?: string,
    status?: HttpStatusCode,
    isOperational?: boolean
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);

    this.code = code || "internal_server_error";
    this.message = message || "Internal server error.";
    this.status = status || HttpStatusCode.INTERNAL_SERVER_ERROR;
    this.isOperational = isOperational || false;

    Error.captureStackTrace(this);
  }
}

const errorMiddleware =
  (): ErrorRequestHandler =>
  async (
    err: HTTPError,
    req: Request,
    res: Response,
    _: NextFunction
  ): Promise<Response> => {
    let errorObject: Partial<HTTPError> = {
      code: "bad_request",
      status: HttpStatusCode.INTERNAL_SERVER_ERROR,
    };

    if (err.code) {
      errorObject.code = err.code;
      errorObject.message = err.message;
      errorObject.status = err.status;

      return res.status(err.status).send(errorObject);
    }
    return res.status(500).send(errorObject);
  };

export default errorMiddleware;
