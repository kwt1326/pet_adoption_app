import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class checkDuplicateFieldInput {
  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  nickname?: string;
}