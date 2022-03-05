import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateReviewInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;

  @Field(() => [String], { nullable: true })
  uris: string[];
}
