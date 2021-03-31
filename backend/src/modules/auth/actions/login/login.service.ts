import { Inject, Injectable } from '@nestjs/common';
import { UserService } from '../../../user/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '../../services/jwt.service';
import { LoginInput } from './login.input';
import { LoginInvalidResponse, LoginOkResponse } from './responses';

@Injectable()
export class LoginService {
  constructor(
    @Inject(JwtService.name) private readonly jwtService: JwtService,
    @Inject(UserService.name) private readonly userService: UserService,
  ) {}

  async login(
    input: LoginInput,
  ): Promise<LoginOkResponse | LoginInvalidResponse> {
    const now = new Date();
    const user = await this.userService.model.findOne({
      email: input.email,
    });

    if (user) {
      if (await bcrypt.compare(input.password, user.password)) {
        return new LoginOkResponse({
          token: this.jwtService.generateToken(
            user.id,
            this.jwtService.expiresIn,
          ),
          expiresIn: this.jwtService.expiresIn,
        });
      }
    }

    return new LoginInvalidResponse();
  }
}
