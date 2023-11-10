export interface ILoginResponse {
  data: string
  message: string
}

export interface IForgotPasswordResponse {
  message: string
}
export interface IResetPasswordResponse {
  message: string
  data: string
}

export interface IErrorResponse {
  message: string
}

export interface IRefreshTokenResponse {
  data: string
  message: string
}
