import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdopteeUserRepository } from '../user/user.repository';
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
      AdoptReviewRepository,
      AdopteeUserRepository,
      AdoptReviewPictureRepository,
      AdoptionReviewLikeRepository,
      AdoptReviewCommentRepository,
    ]),
  ],
  providers: [AdoptReviewResolver, AdoptReviewService],
})
export class AdoptReviewModule {}
