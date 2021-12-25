import {
  Field,
  InputType,
  IntersectionType,
  ObjectType,
  OmitType,
  PickType,
} from '@nestjs/graphql';
import { AdopteeUser } from '../../../entities/adoptee-user.entity';
import { AdoptUser } from '../../../entities/adopt-user.entity';
import { User } from '../../../entities/user.entity';

@InputType()
export class CreateAccountAdopteeUserInput extends IntersectionType(
  PickType(AdopteeUser, ['nickname'] as const),
  PickType(User, ['email', 'password'] as const),
) {}

@InputType()
export class CreateAccountAdoptUserInput extends IntersectionType(
  OmitType(AdoptUser, [
    'user',
    'createdAt',
    'removedAt',
    'updatedAt',
    'authenticatedAt',
  ]),
  PickType(User, ['email', 'password'] as const),
) {}

@InputType()
export class CreateAccountAdminUserInput extends IntersectionType(
  PickType(AdopteeUser, ['nickname'] as const),
  PickType(User, ['email', 'password'] as const),
) {}

@ObjectType()
export class CreateAccountOutput {
  @Field(() => String, { nullable: true })
  error?: string;

  @Field(() => Boolean)
  result: boolean;
}
