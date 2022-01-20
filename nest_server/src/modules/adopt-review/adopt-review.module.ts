import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdoptionReviewLike } from 'src/entities/adopt-review-like.entity';
import { AdoptReview } from '../../entities/adopt-review.entity';
import { AdopteeUser } from '../../entities/adoptee-user.entity';
import { AdopteeUserRepository } from '../user/user.repository';
import { AdoptReviewPictureRepository, AdoptReviewRepository } from './adopt-review.repository';
import { AdoptReviewResolver } from './adopt-review.resolver';
import { AdoptReviewService } from './adopt-review.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AdopteeUser,
      AdoptReview,
      AdoptionReviewLike,
      AdoptReviewRepository,
      AdopteeUserRepository,
      AdoptReviewPictureRepository,
    ]),
  ],
  providers: [
    AdoptReviewResolver,
    AdoptReviewService,
  ],
})
export class AdoptReviewModule {}
