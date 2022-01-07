import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetAdoptionPostArgs {
  @Field(() => Boolean, { nullable: true })
  isProfit: boolean;

  @Field(() => Number, { nullable: true, defaultValue: 1 })
  page: number;
}
