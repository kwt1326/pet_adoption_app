import { BadRequestException } from "@nestjs/common";
import { AdoptReview } from "src/entities/adopt-review.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(AdoptReview)
export class AdoptReviewRepository extends Repository<AdoptReview>{
  async getOneAdoptReviewById(id: number) {
    const review = await this
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.adopteeUser', 'adopteeUser')
      .leftJoinAndSelect('adopteeUser.user', 'user')
      .where('review.id = :id', { id })
      .getOne();

    if (!review) {
      throw new BadRequestException(`There is no review with id of ${id}`);
    }
    return review;
  }
}