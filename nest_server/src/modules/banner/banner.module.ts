import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BannerContent } from 'src/entities/banner-content.entity';
import { Banner } from 'src/entities/banner.entity';
import { BannerResolver } from './banner.resolver';
import { BannerService } from './banner.service';

@Module({
  imports: [TypeOrmModule.forFeature([Banner, BannerContent])],
  providers: [BannerResolver, BannerService],
})
export class BannerModule {}
