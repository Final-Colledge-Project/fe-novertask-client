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

export interface IUploadAvatarBody {
  avatar: File
}

export interface IUpdateUserBody {
  phone: string
  firstName: string
  lastName: string
  birthDate: string
  address: string
}

export interface IChangePasswordRequest{
  currentPassword: string
  newPassword: string
}
