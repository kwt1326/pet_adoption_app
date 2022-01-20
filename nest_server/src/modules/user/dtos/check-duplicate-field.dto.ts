import { Field, InputType, ObjectType } from "@nestjs/graphql";

@InputType()
export class CheckDuplicateFieldInput {
  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  nickname?: string;
}

@ObjectType()
export class CheckDuplicateFieldOutput {
  @Field(() => Boolean, {
    description:`
    The results of the duplicate check.
    true: Duplicate exists.
    false: There is no duplicate.
    `
  })
  result: boolean;
}