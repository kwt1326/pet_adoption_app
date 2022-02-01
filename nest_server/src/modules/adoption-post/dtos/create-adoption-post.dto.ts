import {
  Field,
  InputType,
  IntersectionType,
  ObjectType,
  PickType,
} from '@nestjs/graphql';
import { AdoptionPost } from 'src/entities/adoption-post.entity';
import { CreatePetArgs } from 'src/modules/pet/dtos/create-pet.dto';

@InputType()
export class CreateAdoptionPostArgs extends IntersectionType(
  PickType(AdoptionPost, ['title', 'content'] as const),
  CreatePetArgs,
) {
  @Field(() => [String], { nullable: true })
  uri: string[];
}

@ObjectType()
export class CreateAdoptionPostOutput {
  @Field(() => Boolean)
  result: boolean;

  @Field(() => Number)
  id: number;
}
