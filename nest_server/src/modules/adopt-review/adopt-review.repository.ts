import { AdoptReviewPicture } from 'src/entities/adopt-review-picture.entity';
import { AdoptionReviewLike } from 'src/entities/adopt-review-like.entity';
import { AdoptReview } from 'src/entities/adopt-review.entity';
import { AdopteeUser } from 'src/entities/adoptee-user.entity';
import {
  DeleteResult,
  EntityRepository,
  getConnection,
  Repository,
} from 'typeorm';
import { Comment } from 'src/entities/comment.entity';
import { UpdateAdoptReviewCommentInput } from './dtos/update-review.dto';
import { User } from 'src/entities/user.entity';
import { AdoptionReviewLikeInput } from './dtos/review-like.dto';
import { GetAdoptReviewsArgs } from './dtos/get-adopt-reviews.dto';

interface CreateReviewInput {
  title: string;
  content: string;
}

interface RestOfUpdateInput {
  title?: string;
  content?: string;
}

interface CreatePictureInput {
  adoptReview: AdoptReview;
  uri: string;
}

interface CreateCommentArgs {
  parent: Comment;
  writer: User;
  writerNickname: string;
  post: AdoptReview;
  content: string;
}

@EntityRepository(AdoptReview)
export class AdoptReviewRepository extends Repository<AdoptReview> {
  async createAndSaveReview(
    adopteeUser: AdopteeUser,
    createInput: CreateReviewInput,
  ): Promise<AdoptReview> {
    const adoptReview = await this.create({ adopteeUser, ...createInput });
    return await this.save(adoptReview);
  }

  async getOneAdoptReviewById(id: number): Promise<AdoptReview> {
    const review = await this.createQueryBuilder('review')
      .leftJoinAndSelect('review.adopteeUser', 'adopteeUser')
      .leftJoinAndSelect('adopteeUser.user', 'user')
      .leftJoinAndSelect('review.pictures', 'pictures')
      .leftJoinAndSelect('review.likes', 'likes')
      .leftJoinAndSelect('review.comments', 'comment')
      .leftJoinAndSelect('likes.adopteeUser', 'likeUser')
      .leftJoinAndSelect('comment.parent', 'parent')
      .leftJoinAndSelect('comment.child', 'child')
      .where('comment.parentId IS NULL')
      .andWhere('review.id = :id', { id })
      .getOne();
    return review;
  }

  async getAdoptReviews(
    getAdoptReviewsArgs: GetAdoptReviewsArgs,
  ): Promise<AdoptReview[]> {
    const { page } = getAdoptReviewsArgs;
    const reviews = await this.createQueryBuilder('review')
      .leftJoinAndSelect('review.adopteeUser', 'adopteeUser')
      .leftJoinAndSelect('adopteeUser.user', 'user')
      .leftJoinAndSelect('review.pictures', 'pictures')
      .leftJoinAndSelect('review.likes', 'likes')
      .leftJoinAndSelect('review.comments', 'comment')
      .leftJoinAndSelect('likes.adopteeUser', 'likeUser')
      .leftJoinAndSelect('comment.parent', 'parent')
      .leftJoinAndSelect('comment.child', 'child')
      .where('comment.parentId IS NULL')
      .skip(6 * (page - 1))
      .take(6)
      .orderBy('review.id', 'DESC')
      .getMany();
    return reviews;
  }

  async updateAdoptReview(
    review: AdoptReview,
    updateInput: RestOfUpdateInput,
  ): Promise<AdoptReview> {
    const updatedReview: AdoptReview = { ...review, ...updateInput };
    return await this.save(updatedReview);
  }

  async deleteOneUserById(id: number): Promise<DeleteResult> {
    const result = await getConnection()
      .createQueryBuilder()
      .delete()
      .from(AdoptReview)
      .where('id = :id', { id })
      .execute();
    return result;
  }
}

@EntityRepository(AdoptReviewPicture)
export class AdoptReviewPictureRepository extends Repository<AdoptReviewPicture> {
  async createAdoptReviewPicture(
    input: CreatePictureInput,
  ): Promise<AdoptReviewPicture> {
    const picture = await this.create({ ...input });
    return await this.save(picture);
  }

  async deleteAdoptReviewPicture(id: number): Promise<DeleteResult> {
    const result = getConnection()
      .createQueryBuilder()
      .delete()
      .from(AdoptReviewPicture)
      .where('id = :id', { id })
      .execute();
    return result;
  }
}

@EntityRepository(AdoptionReviewLike)
export class AdoptionReviewLikeRepository extends Repository<AdoptionReviewLike> {
  async createAdoptionReviewLike(
    adopteeUser: AdopteeUser,
    likePost: AdoptReview,
  ) {
    const reviewLike = await this.create({
      adopteeUser,
      likePost,
    });
    return await this.save(reviewLike);
  }

  async deleteAdoptionReviewLike(input: AdoptionReviewLikeInput) {
    const { reviewId, userId } = input;
    const result = await getConnection()
      .createQueryBuilder()
      .delete()
      .from(AdoptionReviewLike)
      .where('userId = :userId', { userId })
      .andWhere('reviewId = :reviewId', { reviewId })
      .execute();
    return result;
  }
}

@EntityRepository(Comment)
export class AdoptReviewCommentRepository extends Repository<Comment> {
  async findOneCommentById(id: number) {
    return this.findOne({ id }, { relations: ['parent', 'child'] });
  }

  async createAdoptReviewComment(createInput: CreateCommentArgs) {
    const comment = this.create(createInput);
    return this.save(comment);
  }

  async deleteAdoptReviewComment(id: number): Promise<DeleteResult> {
    const result = getConnection()
      .createQueryBuilder()
      .delete()
      .from(Comment)
      .where('id = :id', { id })
      .execute();
    return result;
  }

  async updateAdoptReviewComment(
    comment: Comment,
    input: UpdateAdoptReviewCommentInput,
  ): Promise<Comment> {
    const { content } = input;
    const changedComment = { ...comment, content };
    return this.save(changedComment);
  }
}
