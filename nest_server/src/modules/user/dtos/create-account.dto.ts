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
import { User, UserType } from '../../../entities/user.entity';
import { GraphQLJSONObject } from 'graphql-type-json';

export interface CreateAccountUserInput {
  email: string;
  password: string;
  userType: UserType;
}

export interface ErrorOutput {
  statusCode: number;
  message: string;
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
export class CreateAccountOutput {
  @Field(() => GraphQLJSONObject, {
    nullable: true,
    description: `
    This JSON Object consists of 'statusCode' and 'message'
    - statusCode : Error Status code number
    - message : Error message
    `,
  })
  error?: ErrorOutput;

  @Field(() => String, { nullable: true })
  data?: string;
}
