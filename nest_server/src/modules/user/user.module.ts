import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { AdminUser } from '../../entities/admin-user.entity';
import { AdopteeUser } from '../../entities/adoptee-user.entity';
import { AdoptUser } from '../../entities/adopt-user.entity';
import { AdoptUserPicture } from '../../entities/adopt-user-picture.entity';
import { AuthenticateInfo } from '../../entities/authenticate-info.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import {
  AdopteeUserRepository,
  AdoptUserRepository,
  UserRepository,
} from './user.repository';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '../auth/jwt.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      AdoptUser,
      AdopteeUser,
      AdminUser,
      AdoptUserPicture,
      AuthenticateInfo,
      UserRepository,
      AdopteeUserRepository,
      AdoptUserRepository,
    ]),
    AuthModule,
  ],
  providers: [UserService, UserResolver, AuthService, JwtService],
  exports: [UserService],
})
export class UserModule {}
