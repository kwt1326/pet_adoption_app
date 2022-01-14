import {
  Field,
  InputType,
  IntersectionType,
  ObjectType,
  OmitType,
} from '@nestjs/graphql';
import { BannerContent } from 'src/entities/banner-content.entity';
import { Banner } from 'src/entities/banner.entity';

@InputType()
export class CreateBannerInput extends IntersectionType(
  OmitType(BannerContent, ['id'] as const),
  OmitType(Banner, ['id', 'content'] as const),
) {}

@ObjectType()
export class CreateBannerOutput {
  @Field(() => Boolean)
  result: true;

  @Field(() => Number)
  id: number;
}
