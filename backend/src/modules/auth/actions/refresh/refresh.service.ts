import { Inject, Injectable } from '@nestjs/common';
import { UserService } from '../../../user/user.service';
import { JwtService } from '../../services/jwt.service';
import { ICurrentUser } from '../../types/current-user.interface';
import { RefreshInvalidResponse, RefreshOkResponse } from './responses';

@Injectable()
export class RefreshService {
  constructor(
    @Inject(JwtService.name) private readonly jwtService: JwtService,
    @Inject(UserService.name) private readonly userService: UserService,
  ) {}

  async refresh(
    currentUser: ICurrentUser,
  ): Promise<RefreshOkResponse | RefreshInvalidResponse> {
    const user = await this.userService.model
      .findById(currentUser.userId)
      .exec();

    if (user) {
      // TODO: check if token can be refresh i.e. whether user is banned or sth
      return new RefreshOkResponse({
        token: this.jwtService.generateToken(
          user.id,
          this.jwtService.expiresIn,
        ),
        expiresIn: this.jwtService.expiresIn,
      });
    }

    return new RefreshInvalidResponse();
  }
}
