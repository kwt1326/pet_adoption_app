import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class DeleteUserOutput {
  @Field(() => Int, {
    description: `
    The number of records affected by the request.
    `
  })
  result: number;
}