import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateAdoptReviewInput {
  @Field(() => Number)
  id: number;

  @Field(() => String, { nullable: true })
  title: string;

  @Field(() => String, { nullable: true })
  content: string;
}

@InputType()
export class UpdateAdoptReviewCommentInput {
  @Field(() => Number)
  id: number;

  @Field(() => String)
  content: string;
}
