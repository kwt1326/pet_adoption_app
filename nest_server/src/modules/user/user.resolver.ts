import { Args, Mutation, Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import {
  CreateAccountOutput,
  CreateAccountAdoptUserInput,
  CreateAccountAdopteeUserInput,
} from './dtos/create-account.dto';
import { User } from '../../entities/user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => Boolean)
  ping() {
    return true;
  }

  @Mutation(() => CreateAccountOutput)
  createAdopteeAccount(
    @Args('input') createAccountInput: CreateAccountAdopteeUserInput,
  ) {
    return this.userService.createAdopteeAccount(createAccountInput);
  }

  @Mutation(() => CreateAccountOutput)
  createAdoptAccount(
    @Args('input') createAccountInput: CreateAccountAdoptUserInput,
  ) {
    return this.userService.createAdoptAccount(createAccountInput);
  }
}
