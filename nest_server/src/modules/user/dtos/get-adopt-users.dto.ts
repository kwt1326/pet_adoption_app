import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { AdoptUser } from 'src/entities/adopt-user.entity';

@InputType()
export class GetAdoptUsersArgs {
  @Field(() => Number, { nullable: true, defaultValue: 1 })
  page: number;
}

@ObjectType()
export class GetAuthenticatedAdoptUsersOutput extends AdoptUser {
  @Field(() => Number)
  id: number;
}
