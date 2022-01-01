import { Module } from '@nestjs/common';
import { BannerResolver } from './banner.resolver';
import { BannerService } from './banner.service';

@Module({
  providers: [BannerResolver, BannerService],
})
export class BannerModule {}
