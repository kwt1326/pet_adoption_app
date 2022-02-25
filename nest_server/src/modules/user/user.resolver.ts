import { Args, Mutation, Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import {
  CreateAccountOutput,
  CreateAccountAdoptUserInput,
  CreateAccountAdopteeUserInput,
} from './dtos/create-account.dto';
import { User } from '../../entities/user.entity';
import { UserService } from './user.service';
import { AdopteeUser } from 'src/entities/adoptee-user.entity';
import { AdoptUser } from 'src/entities/adopt-user.entity';
import {
  UpdateAdopteeUserInput,
  UpdateAdoptUserInput,
} from './dtos/update-user.dto';
import { DeleteRequestOutput } from '../common/dtos/request-result.dto';
import {
  CheckDuplicateFieldInput,
  CheckDuplicateFieldOutput,
} from './dtos/check-duplicate-field.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth-guard';
import { AuthUser } from '../auth/decorators/auth.decorator';
import { GetAdoptUsersArgs } from './dtos/get-adopt-users.dto';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => Boolean)
  ping() {
    return true;
  }

  @Query(() => CheckDuplicateFieldOutput)
  checkDuplicateField(
    @Args('input') checkFieldInput: CheckDuplicateFieldInput,
  ) {
    return this.userService.checkDuplicateField(checkFieldInput);
  }

  @Query(() => AdopteeUser)
  getOneAdopteeUser(@Args('id') id: number) {
    return this.userService.getOneAdopteeUser(id);
  }

  @Query(() => [AdopteeUser])
  getAllAdopteeUser() {
    return this.userService.getAllAdopteeUser();
  }

  @Query(() => AdoptUser)
  getOneAdoptUser(@Args('id') id: number) {
    return this.userService.getOneAdoptUser(id);
  }

  @Query(() => [AdoptUser])
  getAuthenticatedAdoptUsers(
    @Args('getAdoptUsersArgs') getAdoptUsersArgs: GetAdoptUsersArgs,
  ) {
    return this.userService.getAuthenticatedAdoptUsers(getAdoptUsersArgs);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => DeleteRequestOutput)
  deleteOneUser(@Args('id') id: number, @AuthUser() user: User) {
    return this.userService.deleteOneUser(id, user);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => AdopteeUser)
  updateAdopteeUser(
    @Args('input') updateAdopteeUserInput: UpdateAdopteeUserInput,
    @AuthUser() user: User,
  ) {
    return this.userService.updateAdopteeUser(updateAdopteeUserInput, user);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => AdoptUser)
  updateAdoptUser(
    @Args('input') updateAdoptUserInput: UpdateAdoptUserInput,
    @AuthUser() user: User,
  ) {
    return this.userService.updateAdoptUser(updateAdoptUserInput, user);
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
