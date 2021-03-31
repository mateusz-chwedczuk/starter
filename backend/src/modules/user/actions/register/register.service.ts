import { Inject, Injectable } from '@nestjs/common';
import { hashPassword } from '../../../../shared/utils/hash-password';
import { User } from '../../schema/user.schema';
import { UserService } from '../../user.service';
import { RegisterInput } from './register.input';
import { RegisterEmailTakenResponse, RegisterOkResponse } from './responses';

@Injectable()
export class RegisterService {
  constructor(
    @Inject(UserService.name) private readonly userService: UserService,
  ) {}

  async register(
    input: RegisterInput,
  ): Promise<RegisterOkResponse | RegisterEmailTakenResponse> {
    const emailTaken = await this.userService.model.findOne({
      email: input.email,
    });
    if (emailTaken) return new RegisterEmailTakenResponse();

    const newUser = new this.userService.model({
      createdAt: new Date(),
      email: input.email,
      password: await hashPassword(input.password),
    } as Partial<User>);
    await newUser.save();

    return new RegisterOkResponse();
  }
}
