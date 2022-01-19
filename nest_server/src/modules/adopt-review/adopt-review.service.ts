import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdoptReview } from 'src/entities/adopt-review.entity';
import { AdopteeUser } from 'src/entities/adoptee-user.entity';
import { AdopteeUserRepository } from '../user/user.repository';
import { AdoptReviewRepository } from './adopt-review.repository';
import { CreateReviewInput } from './dtos/create-review.dto';
import { UpdateAdoptReviewInput } from './dtos/update-review.dto';

@Injectable()
export class AdoptReviewService {
  constructor(
    @InjectRepository(AdoptReviewRepository)
    private readonly adoptReviewRepository: AdoptReviewRepository,

    @InjectRepository(AdopteeUserRepository)
    private readonly adopteeUserRepository: AdopteeUserRepository,
  ) {}

  async createAdoptReview(createReviewInput: CreateReviewInput): Promise<AdoptReview> {
    const { adopteeUserId: id, ...createInput } = createReviewInput;
    const adopteeUser: AdopteeUser = await this.adopteeUserRepository.getOneAdopteeUserById(id);
    return await this.adoptReviewRepository.createAndSaveReview(adopteeUser, createInput);
  }

  async getOneAdoptReview(id: number): Promise<AdoptReview> {
    return await this.adoptReviewRepository.getOneAdoptReviewById(id);
  }

  async getAllAdoptReview(): Promise<AdoptReview[]> {
    return await this.adoptReviewRepository.getAllAdoptReview();
  }

  async updateAdoptReview(updateReviewInput: UpdateAdoptReviewInput): Promise<AdoptReview> {
    const { id, ...restOfUpdateInput } = updateReviewInput;
    const review = await this.adoptReviewRepository.getOneAdoptReviewById(id);
    return await this.adoptReviewRepository.updateAdoptReview(review, restOfUpdateInput);
  }
}
