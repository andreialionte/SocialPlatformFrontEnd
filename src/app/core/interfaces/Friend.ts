import { User } from './User';

export interface Friend {
  id: number;
  userId: number;
  user?: User;
  friendId: number;
  friendUser?: User; 
  friendsFrom: Date;
}