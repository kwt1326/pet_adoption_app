import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BannerContent } from 'src/entities/banner-content.entity';
import { Banner } from 'src/entities/banner.entity';
import { Repository } from 'typeorm';
import {
  CreateBannerInput,
  CreateBannerOutput,
} from './dtos/create-banner.dto';

@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(Banner)
    private readonly bannerRepository: Repository<Banner>,
    @InjectRepository(BannerContent)
    private readonly bannerContentRepository: Repository<BannerContent>,
  ) {}

  async createBanner(input: CreateBannerInput): Promise<CreateBannerOutput> {
    const bannerContentEntity = this.bannerContentRepository.create(input);
    const bannerContent = await this.bannerContentRepository.save(
      bannerContentEntity,
    );

    const bannerEntity = this.bannerRepository.create({
      ...input,
      content: bannerContent,
    });

    const banner = await this.bannerRepository.save(bannerEntity);

    return { result: true, id: banner.id };
  }

  async getBannerContent(id: number): Promise<BannerContent> {
    return await this.bannerContentRepository.findOne(id);
  }

  async getBanners(): Promise<Banner[]> {
    return await this.bannerRepository.find({});
  }
}
