import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AdoptReview } from '../../entities/adopt-review.entity';
import { DeleteRequestOutput } from '../common/dtos/request-result.dto';
import { AdoptReviewService } from './adopt-review.service';
import { CreateReviewInput } from './dtos/create-review.dto';
import { UpdateAdoptReviewInput } from './dtos/update-review.dto';

@Resolver()
export class AdoptReviewResolver {
  constructor(private readonly adoptReviewService: AdoptReviewService) {}

  @Mutation(() => AdoptReview)
  createAdoptReview(
    @Args('input') createReviewInput: CreateReviewInput
  ) {
    return this.adoptReviewService.createAdoptReview(createReviewInput);
  }

  @Query(() => AdoptReview)
  getOneAdoptReview(
    @Args('id') id: number
  ) {
    return this.adoptReviewService.getOneAdoptReview(id);
  }

  @Query(() => [AdoptReview])
  getAllAdoptReview() {
    return this.adoptReviewService.getAllAdoptReview();
  }

  @Mutation(() => AdoptReview)
  updateAdoptReview(
    @Args('input') updateAdoptReviewInput: UpdateAdoptReviewInput
  ) {
    return this.adoptReviewService.updateAdoptReview(updateAdoptReviewInput);
  }

  @Mutation(() => DeleteRequestOutput)
  deleteAdoptReview(@Args('id') id: number) {
    return this.adoptReviewService.deleteAdoptReview(id);
  }
}
