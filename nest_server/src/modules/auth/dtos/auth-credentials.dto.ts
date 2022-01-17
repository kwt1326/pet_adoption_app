import { InputType, PickType } from '@nestjs/graphql';
import { User } from 'src/entities/user.entity';

@InputType()
export class LoginInput extends PickType(User, [
  'email',
  'password',
] as const) {}
