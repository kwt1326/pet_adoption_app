import { Args, Query, Resolver } from '@nestjs/graphql';
import { RequestOutput } from '../common/dtos/request-result.dto';
import { AuthService } from './auth.service';
import { LoginInput } from './dtos/auth-credentials.dto';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => RequestOutput)
  async login(
    @Args('input') loginInput: LoginInput,
  ): Promise<RequestOutput<{ token: string }>> {
    const token = await this.authService.login(loginInput);
    return token;
  }
}
