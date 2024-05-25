export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isActive: boolean;
}

export interface UserDTO {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

export interface UserDAO {
  firstName?: string;
  lastName?: string;
  email: string;
  isActive: boolean;
}
