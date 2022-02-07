import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '../auth/jwt.service';
import { UserModule } from '../user/user.module';
import {
  AdopteeUserRepository,
  AdoptUserRepository,
  UserRepository,
} from '../user/user.repository';
import { UserService } from '../user/user.service';
import {
  AdoptionReviewLikeRepository,
  AdoptReviewCommentRepository,
  AdoptReviewPictureRepository,
  AdoptReviewRepository,
} from './adopt-review.repository';
import { AdoptReviewResolver } from './adopt-review.resolver';
import { AdoptReviewService } from './adopt-review.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      AdoptUserRepository,
      AdoptReviewRepository,
      AdopteeUserRepository,
      AdoptReviewPictureRepository,
      AdoptionReviewLikeRepository,
      AdoptReviewCommentRepository,
    ]),
    UserModule,
  ],
  providers: [
    AdoptReviewResolver,
    AdoptReviewService,
    UserService,
    AuthService,
    JwtService,
  ],
})
export class AdoptReviewModule {}
