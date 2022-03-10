import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { AdoptReview } from 'src/entities/adopt-review.entity';

@InputType()
export class GetAdoptReviewsArgs {
  @Field(() => Int, { nullable: true, defaultValue: 1 })
  page: number;
}

@ObjectType()
export class GetAdoptReviewOutput extends AdoptReview {
  @Field(() => Boolean)
  isLiked: boolean;
}
