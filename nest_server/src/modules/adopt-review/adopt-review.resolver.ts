import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AdoptReview } from '../../entities/adopt-review.entity';
import { AdoptReviewService } from './adopt-review.service';
import { CreateReviewInput } from './dtos/create-review.dto';

@Resolver()
export class AdoptReviewResolver {
  constructor(private readonly adoptReviewService: AdoptReviewService) {}

  @Mutation(() => AdoptReview)
  createAdoptReview(
    @Args('input') createReviewInput: CreateReviewInput
  ) {
    return this.adoptReviewService.createAdoptReview(createReviewInput);
  }
}
