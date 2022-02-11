import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCommentInput {
  @Field(() => Number, { nullable: true })
  parentCommentId?: number;

  @Field(() => Number)
  postId: number;

  @Field(() => String)
  content: string;
}
