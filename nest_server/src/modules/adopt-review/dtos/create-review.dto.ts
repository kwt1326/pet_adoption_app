import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateReviewInput {
  @Field(() => Number)
  adopteeUserId: number;

  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;
}
