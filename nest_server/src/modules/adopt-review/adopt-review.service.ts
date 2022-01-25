import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdoptReview } from 'src/entities/adopt-review.entity';
import { AdopteeUser } from 'src/entities/adoptee-user.entity';
import { DeleteRequestOutput } from '../common/dtos/request-result.dto';
import { AdopteeUserRepository } from '../user/user.repository';
import { AdoptReviewPictureRepository, AdoptReviewRepository } from './adopt-review.repository';
import { CreateAdoptReviewPictureInput } from './dtos/create-review-picture.dto';
import { CreateReviewInput } from './dtos/create-review.dto';
import { UpdateAdoptReviewInput } from './dtos/update-review.dto';

@Injectable()
export class AdoptReviewService {
  constructor(
    @InjectRepository(AdoptReviewRepository)
    private readonly adoptReviewRepository: AdoptReviewRepository,

    @InjectRepository(AdopteeUserRepository)
    private readonly adopteeUserRepository: AdopteeUserRepository,

    @InjectRepository(AdoptReviewPictureRepository)
    private readonly adoptReviewPictureRepository: AdoptReviewPictureRepository,
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

  async deleteAdoptReview(id: number): Promise<DeleteRequestOutput> {
    const deleteResult: DeleteRequestOutput = {
      result: (await this.adoptReviewRepository.deleteOneUserById(id)).affected
    }
    if (deleteResult.result === 0) {
      throw new BadRequestException(`There is no review with id of ${id}`);
    }
    return deleteResult;
  }

  async createAdoptReviewPicture(input: CreateAdoptReviewPictureInput) {
    const { reviewId, uri } = input;
    const adoptReview: AdoptReview = await this.adoptReviewRepository.getOneAdoptReviewById(reviewId);
    return await this.adoptReviewPictureRepository.createAdoptReviewPicture({ adoptReview, uri });
  }

  async deleteAdoptReviewPicture(id: number) {
    const resOutput: DeleteRequestOutput = {
      result: (await this.adoptReviewPictureRepository.deleteAdoptReviewPicture(id)).affected
    }
    return resOutput;
  }
}
