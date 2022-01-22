import { Field, ObjectType } from '@nestjs/graphql';
import { Banner } from 'src/entities/banner.entity';

@ObjectType()
export class GetBannersOutput extends Banner {
  @Field(() => Number)
  id: number;
}
