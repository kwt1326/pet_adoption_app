import { Field, InputType, PickType } from '@nestjs/graphql';
import { User } from 'src/entities/user.entity';

@InputType()
export class LoginInput extends PickType(User, ['email'] as const) {
  @Field(() => String)
  password: string;
}
