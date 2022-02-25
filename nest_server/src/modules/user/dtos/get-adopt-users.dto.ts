import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetAdoptUsersArgs {
  @Field(() => Number, { nullable: true, defaultValue: 1 })
  page: number;
}
