import { COMMON_ERROR_CODES } from "./ErrorCodes";

export class Result<T> {
  private _error?: any;
  private _value?: T;
  private errorType?: string;
  private errorMessage?: string;

  private constructor(value?: T, error?: any, type?: string, body?: string) {
    this._value = value;
    this._error = error;
    this.errorType = type;
    this.errorMessage = body;
  }

  get error(): any {
    return this._error;
  }

  get value(): T | undefined {
    return this._value;
  }

  static success<T>(value: T): Result<T> {
    return new Result(value);
  }

  static failure<T>(error: any): Result<T> {
    return new Result<T>(undefined, error);
  }

  static authFailed<T>(body: string): Result<T> {
    return new Result<T>(
      undefined,
      undefined,
      COMMON_ERROR_CODES.FORBIDDEN,
      body
    );
  }

  static validationFailed<T>(body: string): Result<T> {
    return new Result<T>(
      undefined,
      undefined,
      COMMON_ERROR_CODES.INVALID_REQUEST,
      body
    );
  }
}
