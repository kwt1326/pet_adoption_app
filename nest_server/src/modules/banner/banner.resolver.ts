import { HttpException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BannerContent } from 'src/entities/banner-content.entity';
import { Banner } from 'src/entities/banner.entity';
import { User, UserType } from 'src/entities/user.entity';
import { AuthUser } from '../auth/decorators/auth.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth-guard';
import { BannerService } from './banner.service';
import {
  CreateBannerInput,
  CreateBannerOutput,
} from './dtos/create-banner.dto';
import { GetBannersOutput } from './dtos/get-banner.dto';

@Resolver()
export class BannerResolver {
  constructor(private readonly bannerService: BannerService) {}

  @Mutation(() => CreateBannerOutput)
  // @UseGuards(GqlAuthGuard)
  async CreateBanner(
    @AuthUser() user: User,
    @Args('input') input: CreateBannerInput,
  ): Promise<CreateBannerOutput> {
    // if (user && user.userType === UserType.ADMIN) {
    //   if (!user.isAvailable) {
    //     throw new HttpException('Not available User', 401);
    //   }
    //   return await this.bannerService.createBanner(input);
    // }
    // throw new HttpException('Not Found User', 401);

    return await this.bannerService.createBanner(input);
  }

  @Query(() => BannerContent)
  async getBannerContent(@Args('id') id: number): Promise<BannerContent> {
    return await this.bannerService.getBannerContent(id);
  }

  @Query(() => [GetBannersOutput])
  async getBanners(): Promise<GetBannersOutput[]> {
    return await this.bannerService.getBanners();
  }
}
