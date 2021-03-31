import { ObjectId } from 'mongodb';

export interface ICurrentUser {
  userId: string;
  _userId: ObjectId;
}
