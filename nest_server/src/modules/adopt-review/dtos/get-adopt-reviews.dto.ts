import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class GetAdoptReviewsArgs {
  @Field(() => Int, { nullable: true, defaultValue: 1 })
  page: number;
}
