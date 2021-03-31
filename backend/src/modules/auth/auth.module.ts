import { Global, Module } from '@nestjs/common';
import { JwtService } from './services/jwt.service';
import { UserModule } from '../user/user.module';
import { AuthService } from './services/auth.service';
import { LoginResolver } from './actions/login/login.resolver';
import { RefreshService } from './actions/refresh/refresh.service';
import { LoginService } from './actions/login/login.service';
import { RefreshResolver } from './actions/refresh/refresh.resolver';

const actionServices = [LoginService, RefreshService];
const actionResolvers = [LoginResolver, RefreshResolver];

@Global()
@Module({
  imports: [UserModule],
  providers: [JwtService, AuthService, ...actionServices, ...actionResolvers],
  exports: [AuthService],
})
export class AuthModule {}
