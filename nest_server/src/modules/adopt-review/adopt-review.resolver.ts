import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AdoptReviewPicture } from 'src/entities/adopt-review-picture.entity';
import { AdoptReview } from '../../entities/adopt-review.entity';
import { DeleteRequestOutput } from '../common/dtos/request-result.dto';
import { AdoptReviewService } from './adopt-review.service';
import { CreateAdoptReviewPictureInput } from './dtos/create-review-picture.dto';
import {
  AdoptionReviewLikeInput,
  AdoptionReviewLikeOutput,
} from './dtos/review-like.dto';
import { CreateReviewInput } from './dtos/create-review.dto';
import { UpdateAdoptReviewInput } from './dtos/update-review.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth-guard';

@Resolver()
export class AdoptReviewResolver {
  constructor(private readonly adoptReviewService: AdoptReviewService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => AdoptReview)
  createAdoptReview(@Args('input') createReviewInput: CreateReviewInput) {
    return this.adoptReviewService.createAdoptReview(createReviewInput);
  }

  @Query(() => AdoptReview)
  getOneAdoptReview(@Args('id') id: number) {
    return this.adoptReviewService.getOneAdoptReview(id);
  }

  @Query(() => [AdoptReview])
  getAllAdoptReview() {
    return this.adoptReviewService.getAllAdoptReview();
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => AdoptReview)
  updateAdoptReview(
    @Args('input') updateAdoptReviewInput: UpdateAdoptReviewInput,
  ) {
    return this.adoptReviewService.updateAdoptReview(updateAdoptReviewInput);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => DeleteRequestOutput)
  deleteAdoptReview(@Args('id') id: number) {
    return this.adoptReviewService.deleteAdoptReview(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => AdoptReviewPicture)
  createAdoptReviewPicture(
    @Args('input') createAdoptReviewPictureInput: CreateAdoptReviewPictureInput,
  ) {
    return this.adoptReviewService.createAdoptReviewPicture(
      createAdoptReviewPictureInput,
    );
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => DeleteRequestOutput)
  deleteAdopteReviewPicture(@Args('id') id: number) {
    return this.adoptReviewService.deleteAdoptReviewPicture(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => AdoptionReviewLikeOutput)
  toggleAdoptionReviewLike(
    @Args('input') adoptionReviewLikeInput: AdoptionReviewLikeInput,
  ) {
    return this.adoptReviewService.toggleAdoptionReviewLike(
      adoptionReviewLikeInput,
    );
  }
}
