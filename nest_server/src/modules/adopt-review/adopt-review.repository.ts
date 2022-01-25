import { BadRequestException } from "@nestjs/common";
import { AdoptReviewPicture } from "src/entities/adopt-review-picture.entity";
import { AdoptionReviewLike } from "src/entities/adopt-review-like.entity";
import { AdoptReview } from "src/entities/adopt-review.entity";
import { AdopteeUser } from "src/entities/adoptee-user.entity";
import { DeleteResult, EntityRepository, getConnection, Repository } from "typeorm";
import { AdoptionReviewLikeInput } from "./dtos/review-like.dto";

interface createReviewInput {
  title: string
  content: string
}

interface restOfUpdateInput {
  title?: string
  content?: string
}

interface createPictureInput {
  adoptReview: AdoptReview
  uri: string
}

@EntityRepository(AdoptReview)
export class AdoptReviewRepository extends Repository<AdoptReview>{
  async createAndSaveReview(adopteeUser: AdopteeUser, createInput: createReviewInput): Promise<AdoptReview> {
    const adoptReview = await this.create({adopteeUser, ...createInput});
    return await this.save(adoptReview);
  }

  async getOneAdoptReviewById(id: number): Promise<AdoptReview> {
    const review = await this
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.likes', 'likes')
      .leftJoinAndSelect('likes.adopteeUser', 'likeAdopteeUser')
      .leftJoinAndSelect('review.adopteeUser', 'adopteeUser')
      .leftJoinAndSelect('adopteeUser.user', 'user')
      .where('review.id = :id', { id })
      .getOne();

    if (!review) {
      throw new BadRequestException(`There is no review with id of ${id}`);
    }
    return review;
  }

  async getAllAdoptReview(): Promise<AdoptReview[]> {
    const allReviews = await this
    .createQueryBuilder('review')
    .leftJoinAndSelect('review.likes', 'likes')
    .leftJoinAndSelect('likes.adopteeUser', 'likeAdopteeUser')
    .leftJoinAndSelect('review.adopteeUser', 'adopteeUser')
    .leftJoinAndSelect('adopteeUser.user', 'user')
    .getMany();
    return allReviews;
  }

  async updateAdoptReview(review: AdoptReview, updateInput: restOfUpdateInput): Promise<AdoptReview> {
    const updatedReview: AdoptReview = { ...review, ...updateInput };
    return await this.save(updatedReview);
  }

  async deleteOneUserById(id: number): Promise<DeleteResult> {
    const result = await getConnection()
      .createQueryBuilder()
      .delete()
      .from(AdoptReview)
      .where("id = :id", { id })
      .execute();
    return result;
  }
}

@EntityRepository(AdoptReviewPicture)
export class AdoptReviewPictureRepository extends Repository<AdoptReviewPicture> {
  async createAdoptReviewPicture(input: createPictureInput): Promise<AdoptReviewPicture> {
    const picture = await this.create({ ...input });
    return await this.save(picture);
  }

  async deleteAdoptReviewPicture(id: number): Promise<DeleteResult> {
    const result = getConnection()
      .createQueryBuilder()
      .delete()
      .from(AdoptReviewPicture)
      .where("id = :id", { id })
      .execute()
    return result;
  }
}

@EntityRepository(AdoptionReviewLike)
export class AdoptionReviewLikeRepository extends Repository<AdoptionReviewLike> {
  async createAdoptionReviewLike(adopteeUser: AdopteeUser, likePost: AdoptReview) {
    const reviewLike = await this.create({ adopteeUser, likePost });
    return await this.save(reviewLike);
  }

  async deleteAdoptionReviewLike(input: AdoptionReviewLikeInput) {
    const { userId, reviewId } = input;
    const result = await getConnection()
      .createQueryBuilder()
      .delete()
      .from(AdoptionReviewLike)
      .where("adopteeUser = :userId", { userId })
      .andWhere("likePost = :reviewId", { reviewId })
      .execute();
    return result;
  }
}