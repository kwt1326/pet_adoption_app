import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field(() => String, { nullable: true })
  password?: string;

  @Field(() => Boolean, { nullable: true })
  isAvailable?: boolean;
}

@InputType()
export class UpdateAdopteeUserInput {
  @Field(() => Number)
  id: number;

  @Field(() => UpdateUserInput, { nullable: true })
  user?: UpdateUserInput;

  @Field(() => String, { nullable: true })
  nickname?: string;

  @Field(() => Boolean, { nullable: true })
  isAuthenticated?: boolean;

  @Field(() => Date, { nullable: true })
  authenticatedAt?: Date;
}

@InputType()
export class UpdateAdoptUserInput {
  @Field(() => Number)
  id: number;

  @Field(() => UpdateUserInput, { nullable: true })
  user?: UpdateUserInput;

  @Field(() => String, { nullable: true })
  nickname?: string;

  @Field(() => String, { nullable: true })
  companyName?: string;

  @Field(() => String, { nullable: true })
  address?: string;

  @Field(() => String, { nullable: true })
  phoneNumber?: string;

  @Field(() => String, { nullable: true })
  pageUri?: string;

  @Field(() => Boolean, { nullable: true })
  isAuthenticated?: boolean;

  @Field(() => Boolean, { nullable: true })
  isProfit?: boolean; // 일반업체 = true / 보호소 = false

  @Field(() => Date, { nullable: true })
  authenticatedAt?: Date;
}
