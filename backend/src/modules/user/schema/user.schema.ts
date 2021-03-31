import { prop as Property } from '@typegoose/typegoose';

export class User {
  @Property({ required: true })
  createdAt: Date;

  @Property({ required: true, trim: true })
  email: string;

  @Property({ required: true })
  password: string;
}
