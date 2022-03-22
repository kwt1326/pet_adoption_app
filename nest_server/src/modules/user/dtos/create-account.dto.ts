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

export interface LoginInput {
  email: string;
  password: string;
}
export interface CreateAccountUserInput {
  email: string;
  nickname?: string;
  password: string;
  userType: UserType;
}

@InputType()
export class CreateAccountAdopteeUserInput extends IntersectionType(
  PickType(AdopteeUser, ['nickname'] as const),
  PickType(User, ['email'] as const),
) {
  @Field(() => String)
  password: string;
}

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
  PickType(User, ['email'] as const),
) {
  @Field(() => String)
  password: string;
}

@InputType()
export class CreateAccountAdminUserInput extends IntersectionType(
  PickType(AdopteeUser, ['nickname'] as const),
  PickType(User, ['email'] as const),
) {
  @Field(() => String)
  password: string;
}

@ObjectType()
export class CreateAccountOutput {
  @Field(() => String, {
    nullable: true,
    description: '회원가입 성공 시, JWT Access Token이 발급됩니다.',
  })
  token?: string;
}
