import { BadRequestException } from "@nestjs/common";
import { AdoptReview } from "src/entities/adopt-review.entity";
import { AdopteeUser } from "src/entities/adoptee-user.entity";
import { DeleteResult, EntityRepository, getConnection, Repository } from "typeorm";

interface createReviewInput {
  title: string
  content: string
}

interface restOfUpdateInput {
  title?: string
  content?: string
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