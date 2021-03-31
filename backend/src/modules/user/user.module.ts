import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { RegisterResolver } from './actions/register/register.resolver';
import { RegisterService } from './actions/register/register.service';
import { User } from './schema/user.schema';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [TypegooseModule.forFeature([User])],
  providers: [UserService, UserResolver, RegisterResolver, RegisterService],
  exports: [UserService],
})
export class UserModule {}
