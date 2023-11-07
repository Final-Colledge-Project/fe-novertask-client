export interface ISignInBody {
  email: string
  password: string
}

export interface IForgotPasswordBody {
  email: string
}

export interface IResetPasswordBody {
  email: string
  otp: string
  newPassword: string
}
