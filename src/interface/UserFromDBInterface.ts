export interface UserFromDBInterface {
  userID: string;
  name: string;
  password: string;
  email: string;
  description: string;
  numberOfWalks: number;
  isAdmin: 1 | 2;
}
