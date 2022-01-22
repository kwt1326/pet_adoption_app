import { HttpException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/guards/gql-auth-guard';
import { GetAdoptionPostArgs, GetAdoptionPostsOutput } from './dtos/get-adoption-post.dto';
import {
  CreateAdoptionPostArgs,
  CreateAdoptionPostOutput,
} from './dtos/create-adoption-post.dto';
import { User, UserType } from 'src/entities/user.entity';
import { AdoptionPost } from 'src/entities/adoption-post.entity';
import { AdoptionPostService } from './adoption-post.service';
import { UserService } from '../user/user.service';
import { AuthUser } from '../auth/decorators/auth.decorator';

@Resolver()
export class AdoptionPostResolver {
  constructor(
    private readonly adoptionPostService: AdoptionPostService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => CreateAdoptionPostOutput)
  @UseGuards(GqlAuthGuard)
  async createAdoptionPost(
    @AuthUser() user: User,
    @Args('postArgs') postArgs: CreateAdoptionPostArgs,
  ): Promise<CreateAdoptionPostOutput> {
    if (user && user.userType === UserType.ADOPT) {
      if (!user.isAvailable) {
        throw new HttpException('Not available User', 401);
      }
      const adoptUser = await this.userService.findAdoptUser(user);
      if (adoptUser) {
        return await this.adoptionPostService.createAdoptionPost(
          adoptUser,
          postArgs,
        );
      }
    }
  }

  @Query(() => [GetAdoptionPostsOutput])
  async getPosts(
    @Args('getPostsArgs') getPostsArgs: GetAdoptionPostArgs,
  ): Promise<GetAdoptionPostsOutput[]> {
    return await this.adoptionPostService.getAdoptionPosts(getPostsArgs);
  }

  @Query(() => AdoptionPost)
  async getPost(@Args('id') id: number): Promise<AdoptionPost> {
    return await this.adoptionPostService.getAdoptionPost(id);
  }
}
