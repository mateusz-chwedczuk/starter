import { Inject, Injectable } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { JwtService } from './jwt.service';
import { ObjectId } from 'mongodb';
import { ICurrentUser } from '../types/current-user.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(JwtService) private readonly jwtService: JwtService,
    @Inject(UserService) private readonly userService: UserService,
  ) {}

  async validateRequest(authHeader: string, request: any): Promise<boolean> {
    const decodedUser = await this.jwtService.validateToken(authHeader);
    const foundUser = await this.userService.model.findById(decodedUser.userId);
    if (!foundUser) return false;

    request.user = {
      userId: decodedUser.userId,
      _userId: new ObjectId(decodedUser.userId),
    } as ICurrentUser;

    return true;
  }
}
