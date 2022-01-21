import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdoptionReviewLike } from 'src/entities/adopt-review-like.entity';
import { AdoptReview } from 'src/entities/adopt-review.entity';
import { AdopteeUser } from 'src/entities/adoptee-user.entity';
import { DeleteRequestOutput } from '../common/dtos/request-result.dto';
import { AdopteeUserRepository } from '../user/user.repository';
import { AdoptionReviewLikeRepository, AdoptReviewPictureRepository, AdoptReviewRepository } from './adopt-review.repository';
import { AdoptionReviewLikeInput } from './dtos/review-like.dto';
import { CreateReviewInput } from './dtos/create-review.dto';
import { UpdateAdoptReviewInput } from './dtos/update-review.dto';
import { CreateAdoptReviewPictureInput } from './dtos/create-review-picture.dto';

@Injectable()
export class AdoptReviewService {
  constructor(
    @InjectRepository(AdoptReviewRepository)
    private readonly adoptReviewRepository: AdoptReviewRepository,

    @InjectRepository(AdopteeUserRepository)
    private readonly adopteeUserRepository: AdopteeUserRepository,

    @InjectRepository(AdoptReviewPictureRepository)
    private readonly adoptReviewPictureRepository: AdoptReviewPictureRepository,

    @InjectRepository(AdoptionReviewLikeRepository)
    private readonly adoptionReviewLikeRepository: AdoptionReviewLikeRepository,
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

  isAlreadyInLikes(review: AdoptReview, userId: number): boolean {
    return review.likes.some((like) => like.adopteeUser.userId === userId)
  }

  async createAdoptionReviewLike(input: AdoptionReviewLikeInput): Promise<AdoptionReviewLike> {
    const { userId, reviewId } = input;
    const review = await this.adoptReviewRepository.getOneAdoptReviewById(reviewId);
    if (this.isAlreadyInLikes(review, userId)) {
      throw new BadRequestException("It's already registered");
    }
    const user = await this.adopteeUserRepository.getOneAdopteeUserById(userId);
    return await this.adoptionReviewLikeRepository.createAdoptionReviewLike(user, review);
  }

  async deleteAdoptionReviewLike(input: AdoptionReviewLikeInput): Promise<DeleteRequestOutput> {
    const resOutput : DeleteRequestOutput = {
      result: (await this.adoptionReviewLikeRepository.deleteAdoptionReviewLike(input)).affected
    }
    return resOutput;
  }
}
