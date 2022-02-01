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
  getAllAdoptUser() {
    return this.userService.getAllAdoptUser();
  }

  @Mutation(() => DeleteRequestOutput)
  deleteOneUser(@Args('id') id: number) {
    return this.userService.deleteOneUser(id);
  }

  @Mutation(() => AdopteeUser)
  updateAdopteeUser(
    @Args('input') updateAdopteeUserInput: UpdateAdopteeUserInput,
  ) {
    return this.userService.updateAdopteeUser(updateAdopteeUserInput);
  }

  @Mutation(() => AdoptUser)
  updateAdoptUser(@Args('input') updateAdoptUserInput: UpdateAdoptUserInput) {
    return this.userService.updateAdoptUser(updateAdoptUserInput);
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
