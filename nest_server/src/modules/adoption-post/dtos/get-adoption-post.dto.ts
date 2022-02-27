import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { AdoptionPost } from 'src/entities/adoption-post.entity';
import { PetType } from 'src/entities/pets.entity';

@InputType()
export class GetAdoptionPostsArgs {
  @Field(() => Boolean, { nullable: true })
  isLiked: boolean;

  @Field(() => Boolean, { nullable: true })
  isProfit: boolean;

  @Field(() => String, { nullable: true })
  petType: PetType;

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

@ObjectType()
export class GetRecentlyAdoptionPostsOutput {
  @Field(() => [GetAdoptionPostsOutput])
  dog: GetAdoptionPostsOutput[];

  @Field(() => [GetAdoptionPostsOutput])
  cat: GetAdoptionPostsOutput[];
}
