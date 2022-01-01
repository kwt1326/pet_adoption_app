import { Module } from '@nestjs/common';
import { AdoptReviewResolver } from './adopt-review.resolver';
import { AdoptReviewService } from './adopt-review.service';

@Module({
  providers: [AdoptReviewResolver, AdoptReviewService],
})
export class AdoptReviewModule {}
