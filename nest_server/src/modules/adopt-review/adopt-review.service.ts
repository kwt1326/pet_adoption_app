import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdopteeUser } from 'src/entities/adoptee-user.entity';
import { AdopteeUserRepository } from '../user/user.repository';
import { AdoptReviewRepository } from './adopt-review.repository';
import { CreateReviewInput } from './dtos/create-review.dto';

@Injectable()
export class AdoptReviewService {
  constructor(
    @InjectRepository(AdoptReviewRepository)
    private readonly adoptReviewRepository: AdoptReviewRepository,

    @InjectRepository(AdopteeUserRepository)
    private readonly adopteeUserRepository: AdopteeUserRepository,
  ) {}

  async createAdoptReview(createReviewInput: CreateReviewInput) {
    const { adopteeUserId: id, ...createInput} = createReviewInput;
    const adopteeUser: AdopteeUser = await this.adopteeUserRepository.getOneAdopteeUserById(id);
    const adoptReview = await this.adoptReviewRepository.create({adopteeUser, ...createInput});
    return await this.adoptReviewRepository.save(adoptReview);
  }

  async getOneAdoptReview(id: number) {
    return await this.adoptReviewRepository.getOneAdoptReviewById(id);
  }
}
