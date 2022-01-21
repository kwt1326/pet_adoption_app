import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateAdoptionReviewLikeInput {
  @Field(() => Number,{
    description: `
    The ID of the AdopteeUser who clicked like.
    `,
  })
  userId: number;

  @Field(() => Number, {
    description: `
    The ID of the AdoptReview where the likes will be recorded
    `
  })
  reviewId: number;
}