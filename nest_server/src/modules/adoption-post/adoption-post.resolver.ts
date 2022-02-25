import { HttpException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/guards/gql-auth-guard';
import {
  GetAdoptionPostsArgs,
  GetAdoptionPostsOutput,
  GetRecentlyAdoptionPostsOutput,
} from './dtos/get-adoption-post.dto';
import {
  CreateAdoptionPostArgs,
  CreateAdoptionPostOutput,
  ToggleAdoptionPostLikeArgs,
  ToggleAdoptionPostLikeOutput,
} from './dtos/create-adoption-post.dto';
import { User, UserType } from 'src/entities/user.entity';
import { AdoptionPost } from 'src/entities/adoption-post.entity';
import { AdoptionPostService } from './adoption-post.service';
import { UserService } from '../user/user.service';
import { AuthUser } from '../auth/decorators/auth.decorator';
import { LikeResult } from '../adopt-review/dtos/review-like.dto';

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

  @Query(() => GetRecentlyAdoptionPostsOutput)
  @UseGuards(GqlAuthGuard)
  async getRecentlyPosts(
    @AuthUser() user: User,
  ): Promise<GetRecentlyAdoptionPostsOutput> {
    return await this.adoptionPostService.getRecentlyAdoptionPosts(user);
  }

  @Query(() => [GetAdoptionPostsOutput])
  @UseGuards(GqlAuthGuard)
  async getPosts(
    @AuthUser() user: User,
    @Args('getPostsArgs') getPostsArgs: GetAdoptionPostsArgs,
  ): Promise<GetAdoptionPostsOutput[]> {
    return await this.adoptionPostService.getAdoptionPosts(user, getPostsArgs);
  }

  @Query(() => GetAdoptionPostsOutput)
  @UseGuards(GqlAuthGuard)
  async getPost(
    @AuthUser() user: User,
    @Args('id') id: number,
  ): Promise<GetAdoptionPostsOutput> {
    return await this.adoptionPostService.getAdoptionPost(user, id);
  }

  @Mutation(() => ToggleAdoptionPostLikeOutput)
  @UseGuards(GqlAuthGuard)
  async toggleAdoptionPostLike(
    @AuthUser() user: User,
    @Args('likeArgs') likeArgs: ToggleAdoptionPostLikeArgs,
  ): Promise<ToggleAdoptionPostLikeOutput> {
    if (user && user.userType === UserType.ADOPTEE) {
      const adopteeUser = await this.userService.findAdopteeUser(user);
      if (adopteeUser) {
        return await this.adoptionPostService.toggleAdoptionPostLike(
          adopteeUser,
          likeArgs,
        );
      }
    }
    return { result: false, type: LikeResult.FAIL };
  }
}
