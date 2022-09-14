export interface ICreateUserDto {
  email: string;
  password: string;
  firstName?: string | null;
  lastName?: string | null;
}

export interface ILoginDto {
  email: string;
  password: string;
}


export interface IUserResponse {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

