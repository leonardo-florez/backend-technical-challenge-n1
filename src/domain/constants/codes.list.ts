import { CodesEnum } from "./codes.enum";

export const CodesList: Record<CodesEnum, { status: number; message: string }> =
  {
    [CodesEnum.BUY_CORN_SUCCESS_BUY]: {
      status: 200,
      message: "Purchase successful",
    },
    [CodesEnum.BUY_CORN_NOT_FOUND_CUSTOMER]: {
      status: 404,
      message: "Customer not found",
    },
    [CodesEnum.BUY_CORN_SERVER_ERROR]: {
      status: 500,
      message: "Error processing purchase",
    },
    [CodesEnum.BUY_CORN_RATE_LIMIT_EXCEEDED]: {
      status: 429,
      message: "Too many requests",
    },
    [CodesEnum.CREATE_CUSTOMER_SUCCESS]: {
      status: 201,
      message: "Customer created successfully",
    },
    [CodesEnum.CREATE_CUSTOMER_ALREADY_EXISTS]: {
      status: 409,
      message: "Customer already exists",
    },
    [CodesEnum.CREATE_CUSTOMER_SERVER_ERROR]: {
      status: 500,
      message: "Error creating customer",
    },
    [CodesEnum.LOGIN_SUCCESS]: {
      status: 200,
      message: "Login successful",
    },
    [CodesEnum.LOGIN_INVALID_CREDENTIALS]: {
      status: 401,
      message: "Invalid email or password",
    },
    [CodesEnum.LOGIN_SERVER_ERROR]: {
      status: 500,
      message: "Error processing login",
    }
  };
