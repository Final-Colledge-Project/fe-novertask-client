export interface ISendOTPResponse {
  message: string
  status: string
}

export interface IVerifyResponse {
  status: string
  message: string
}

export interface IErrorResponse {
  message: string
}

export interface ISignUpResponse {
  data: {
    token: string
  }
  message: string
}