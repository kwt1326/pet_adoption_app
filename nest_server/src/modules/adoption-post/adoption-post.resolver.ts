import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateAdoptionPostArgs } from './dtos/create-adoption-post.dto';
import { AdoptionPostService } from './adoption-post.service';
import { AdoptionPost } from 'src/entities/adoption-post.entity';
import { GetAdoptionPostArgs } from './dtos/get-adoption-post.dto';
import { AdoptUser } from 'src/entities/adopt-user.entity';
import { AuthUser } from '../auth/decorators/auth.decorator';
import { RequestOutput } from '../common/dtos/request-result.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth-guard';

@Resolver()
export class AdoptionPostResolver {
  constructor(private readonly adoptionPostService: AdoptionPostService) {}

  @Mutation(() => RequestOutput)
  async createAdoptionPost(
    // TODO: user 로그인 되면 현재 로그인 되어있는(gql context 할당되어 있는) 유저로 받을 것
    // TODO: @AuthUser 데코레이터 구현시 대체 해야합니다.
    @AuthUser() user: AdoptUser,
    @Args('postArgs') postArgs: CreateAdoptionPostArgs,
  ): Promise<RequestOutput> {
    return await this.adoptionPostService.createAdoptionPost(user, postArgs);
  }

  @Query(() => RequestOutput)
  @UseGuards(GqlAuthGuard)
  async getPosts(
    @Args('getPostsArgs') getPostsArgs: GetAdoptionPostArgs,
  ): Promise<RequestOutput<AdoptionPost[]>> {
    return await this.adoptionPostService.getAdoptionPosts(getPostsArgs);
  }
}

/**
 * mutation 입력 예제
 * 
# mutation {
#   createAdoptionPost(postArgs: {
#     title: "입양글제목1",
# 		content: "기래요~?",
# 		name: "요크셔1",
# 		breed: "요크셔테리어",
# 		type: "dog",
# 		price: 3000000,
# 		age: 1,
# 		weight: 5,
# 		isGenderMale: false,
# 		vaccinated: false,
# 		neutered: false,
# 		characteristic: "잘 뛰어다녀요~!",
# 		othersInfo: "낮선 사람에게도 순종적입니다!"
#   }) {
#     result
# }
 */
