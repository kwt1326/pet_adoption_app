import {
  Field,
  InputType,
  Int,
  IntersectionType,
  ObjectType,
  OmitType,
  PickType,
} from '@nestjs/graphql';
import { AdopteeUser } from '../../../entities/adoptee-user.entity';
import { AdoptUser } from '../../../entities/adopt-user.entity';
import { User, UserType } from '../../../entities/user.entity';

export interface CreateAccountUserInput {
  email: string;
  nickname?: string;
  password: string;
  userType: UserType;
}

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
    'isAuthenticated',
    'authenticatedAt',
  ] as const),
  PickType(User, ['email', 'password'] as const),
) {}

@InputType()
export class CreateAccountAdminUserInput extends IntersectionType(
  PickType(AdopteeUser, ['nickname'] as const),
  PickType(User, ['email', 'password'] as const),
) {}

@ObjectType()
export class ErrorOutput {
  @Field(() => Int, {
    description: 'Error Status code number',
  })
  statusCode: number;

  @Field(() => String, {
    description: 'Error message',
  })
  message: string;
}

@ObjectType()
export class CreateAccountOutput {
  @Field(() => ErrorOutput, {
    nullable: true,
  })
  error?: ErrorOutput;

  @Field(() => String, {
    nullable: true,
    description: 'This is jwt-AccessToken',
  })
  data?: string;
}
