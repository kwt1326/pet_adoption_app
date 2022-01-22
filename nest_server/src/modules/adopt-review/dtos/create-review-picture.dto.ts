import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateAdoptReviewPictureInput {
  @Field(() => Number, {
    description: '사진을 업로드 할 리뷰 게시물의 id'
  })
  reviewId: number;

  @Field(() => String)
  uri: string;
}