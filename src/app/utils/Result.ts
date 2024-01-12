export class Result<T> {
  private _error?: any;
  private _value?: T;

  private constructor(value?: T, error?: any) {
    this._value = value;
    this._error = error;
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

  static failure<T>(error: any, errorType?: string): Result<T> {
    return new Result<T>(undefined, error);
  }
}
