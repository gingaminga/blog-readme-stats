import { IErrorData } from "./error.type";

declare global {
  namespace Express {
    interface Response {
      error(code: number, errorMessage: string, data?: IErrorData): void;
      result(data: any): void;
    }
  }
}
