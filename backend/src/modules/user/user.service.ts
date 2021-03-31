import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { User } from './schema/user.schema';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: ReturnModelType<typeof User>,
  ) {}

  get model(): ReturnModelType<typeof User> {
    return this.userModel;
  }
}
