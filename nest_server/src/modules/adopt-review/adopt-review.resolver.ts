import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AdoptReviewPicture } from 'src/entities/adopt-review-picture.entity';
import { AdoptReview } from '../../entities/adopt-review.entity';
import { DeleteRequestOutput } from '../common/dtos/request-result.dto';
import { AdoptReviewService } from './adopt-review.service';
import { CreateAdoptReviewPictureInput } from './dtos/create-review-picture.dto';
import { AdoptionReviewLikeOutput } from './dtos/review-like.dto';
import { CreateReviewInput } from './dtos/create-review.dto';
import {
  UpdateAdoptReviewCommentInput,
  UpdateAdoptReviewInput,
} from './dtos/update-review.dto';
import { Comment } from 'src/entities/comment.entity';
import { CreateCommentInput } from './dtos/create-comment.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth-guard';
import { AuthUser } from '../auth/decorators/auth.decorator';
import { User } from 'src/entities/user.entity';
import { GetAdoptReviewsArgs } from './dtos/get-adopt-reviews.dto';

@Resolver()
export class AdoptReviewResolver {
  constructor(private readonly adoptReviewService: AdoptReviewService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => AdoptReview)
  createAdoptReview(
    @AuthUser() user: User,
    @Args('input') createReviewInput: CreateReviewInput,
  ) {
    return this.adoptReviewService.createAdoptReview(user, createReviewInput);
  }

  @Query(() => AdoptReview)
  getOneAdoptReview(@Args('id') id: number) {
    return this.adoptReviewService.getOneAdoptReview(id);
  }

  @Query(() => [AdoptReview])
  getAdoptReviews(
    @Args('getAdoptReviewsArgs') getAdoptReviewsArgs: GetAdoptReviewsArgs,
  ) {
    return this.adoptReviewService.getAdoptReviews(getAdoptReviewsArgs);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => AdoptReview)
  updateAdoptReview(
    @Args('input') updateAdoptReviewInput: UpdateAdoptReviewInput,
    @AuthUser() user: User,
  ) {
    return this.adoptReviewService.updateAdoptReview(
      updateAdoptReviewInput,
      user,
    );
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => DeleteRequestOutput)
  deleteAdoptReview(@Args('id') id: number, @AuthUser() user: User) {
    return this.adoptReviewService.deleteAdoptReview(id, user);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => AdoptReviewPicture)
  createAdoptReviewPicture(
    @Args('input') createAdoptReviewPictureInput: CreateAdoptReviewPictureInput,
    @AuthUser() user: User,
  ) {
    return this.adoptReviewService.createAdoptReviewPicture(
      createAdoptReviewPictureInput,
      user,
    );
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => DeleteRequestOutput)
  deleteAdoptReviewPicture(@Args('id') id: number, @AuthUser() user: User) {
    return this.adoptReviewService.deleteAdoptReviewPicture(id, user);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => AdoptionReviewLikeOutput)
  toggleAdoptionReviewLike(
    @Args('reviewId') reviewId: number,
    @AuthUser() user: User,
  ) {
    return this.adoptReviewService.toggleAdoptionReviewLike(reviewId, user);
  }

  @Mutation(() => Comment)
  @UseGuards(GqlAuthGuard)
  async createAdoptReviewComment(
    @AuthUser() user: User,
    @Args('input') createCommentInput: CreateCommentInput,
  ): Promise<Comment> {
    return await this.adoptReviewService.createAdoptReviewComment(
      createCommentInput,
      user,
    );
  }

  @Mutation(() => DeleteRequestOutput)
  @UseGuards(GqlAuthGuard)
  deleteAdoptReviewComment(@AuthUser() user: User, @Args('id') id: number) {
    return this.adoptReviewService.deleteAdoptReviewComment(user, id);
  }

  @Mutation(() => Comment)
  @UseGuards(GqlAuthGuard)
  updateAdoptReviewComment(
    @AuthUser() user: User,
    @Args('input') updateAdoptReviewCommentInput: UpdateAdoptReviewCommentInput,
  ) {
    return this.adoptReviewService.updateAdoptReviewComment(
      updateAdoptReviewCommentInput,
      user,
    );
  }
}
