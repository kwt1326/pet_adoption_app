import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { AdoptionPost } from 'src/entities/adoption-post.entity';

@InputType()
export class GetAdoptionPostsArgs {
  @Field(() => Boolean, { nullable: true })
  isProfit: boolean;

  @Field(() => Number, { nullable: true, defaultValue: 1 })
  page: number;
}

@ObjectType()
export class GetAdoptionPostsOutput extends AdoptionPost {
  @Field(() => Number)
  id: number;

  @Field(() => Boolean)
  isLiked: boolean;
}
