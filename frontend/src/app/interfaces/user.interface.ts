export interface UserInterface {
  email: string;
  password: string;
}

export interface UserSignUpInterface extends UserInterface{
  firstName: string;
  lastName: string;
  confirmPassword: string;
}
