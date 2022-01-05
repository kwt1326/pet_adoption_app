import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dtos/auth-credentials.dto';

@Resolver()
export class AuthResolver {
  constructor(
    private authService: AuthService
  ) {}

  @Query(() => String)
  async login(
    @Args('input') loginInput: LoginInput,
  ) {
    const token = await this.authService.login(loginInput);
    return token;
  }
}
