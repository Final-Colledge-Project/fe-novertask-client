export interface ISendOTP {
  email: string
}

export interface IVerifyOTP {
  email: string
  otp: string
}

export interface ISignUpBody {
  phone: string
  firstName: string
  lastName: string
  email: string
  password: string
  birthDate: string
  address: string
}
