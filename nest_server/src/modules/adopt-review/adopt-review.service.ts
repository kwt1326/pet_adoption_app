import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdoptReview } from 'src/entities/adopt-review.entity';
import { AdopteeUser } from 'src/entities/adoptee-user.entity';
import { DeleteRequestOutput } from '../common/dtos/request-result.dto';
import { AdopteeUserRepository } from '../user/user.repository';
import {
  AdoptionReviewLikeRepository,
  AdoptReviewCommentRepository,
  AdoptReviewPictureRepository,
  AdoptReviewRepository,
} from './adopt-review.repository';
import {
  AdoptionReviewLikeInput,
  AdoptionReviewLikeOutput,
  LikeResult,
} from './dtos/review-like.dto';
import { CreateReviewInput } from './dtos/create-review.dto';
import { UpdateAdoptReviewInput } from './dtos/update-review.dto';
import { CreateAdoptReviewPictureInput } from './dtos/create-review-picture.dto';
import { CreateCommentInput } from './dtos/create-comment.dto';
import { User, UserType } from 'src/entities/user.entity';
import { Comment } from 'src/entities/comment.entity';

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

    @InjectRepository(AdoptReviewCommentRepository)
    private readonly adoptReviewCommentRepository: AdoptReviewCommentRepository,
  ) {}

  async createAdoptReview(
    createReviewInput: CreateReviewInput,
  ): Promise<AdoptReview> {
    const { adopteeUserId: id, ...createInput } = createReviewInput;
    const adopteeUser: AdopteeUser =
      await this.adopteeUserRepository.getOneAdopteeUserById(id);
    return await this.adoptReviewRepository.createAndSaveReview(
      adopteeUser,
      createInput,
    );
  }

  async getOneAdoptReview(id: number): Promise<AdoptReview> {
    return await this.adoptReviewRepository.getOneAdoptReviewById(id);
  }

  async getAllAdoptReview(): Promise<AdoptReview[]> {
    return await this.adoptReviewRepository.getAllAdoptReview();
  }

  async updateAdoptReview(
    updateReviewInput: UpdateAdoptReviewInput,
  ): Promise<AdoptReview> {
    const { id, ...restOfUpdateInput } = updateReviewInput;
    const review = await this.adoptReviewRepository.getOneAdoptReviewById(id);
    return await this.adoptReviewRepository.updateAdoptReview(
      review,
      restOfUpdateInput,
    );
  }

  async deleteAdoptReview(id: number): Promise<DeleteRequestOutput> {
    const deleteResult: DeleteRequestOutput = {
      result: (await this.adoptReviewRepository.deleteOneUserById(id)).affected,
    };
    if (deleteResult.result === 0) {
      throw new BadRequestException(`There is no review with id of ${id}`);
    }
    return deleteResult;
  }

  async createAdoptReviewPicture(input: CreateAdoptReviewPictureInput) {
    const { reviewId, uri } = input;
    const adoptReview: AdoptReview =
      await this.adoptReviewRepository.getOneAdoptReviewById(reviewId);
    return await this.adoptReviewPictureRepository.createAdoptReviewPicture({
      adoptReview,
      uri,
    });
  }

  async deleteAdoptReviewPicture(id: number) {
    const resOutput: DeleteRequestOutput = {
      result: (
        await this.adoptReviewPictureRepository.deleteAdoptReviewPicture(id)
      ).affected,
    };
    return resOutput;
  }

  isAlreadyInLikes(review: AdoptReview, userId: number): boolean {
    return review.likes.some((like) => like.adopteeUser.userId === userId);
  }

  async toggleAdoptionReviewLike(
    input: AdoptionReviewLikeInput,
  ): Promise<AdoptionReviewLikeOutput> {
    const { userId, reviewId } = input;
    const resOutput: AdoptionReviewLikeOutput = {
      result: LikeResult.CREATE,
    };
    const review = await this.adoptReviewRepository.getOneAdoptReviewById(
      reviewId,
    );
    if (this.isAlreadyInLikes(review, userId)) {
      await this.adoptionReviewLikeRepository.deleteAdoptionReviewLike(input);
      resOutput.result = LikeResult.DELETE;
    } else {
      const user = await this.adopteeUserRepository.getOneAdopteeUserById(
        userId,
      );
      await this.adoptionReviewLikeRepository.createAdoptionReviewLike(
        user,
        review,
      );
    }
    return resOutput;
  }

  async exceptionHandlingOfPost(postId: number) {
    const post = await this.adoptReviewRepository.getOneAdoptReviewById(postId);
    if (!post) {
      throw new BadRequestException('존재하지 않는 게시물입니다.');
    }
    return post;
  }

  async exceptionHandlingOfParentComment(parentId: number) {
    if (parentId) {
      const parentComment =
        await this.adoptReviewCommentRepository.findOneCommentById(parentId);
      if (!parentComment) {
        throw new BadRequestException('댓글이 존재하지 않습니다.');
      }
      return parentComment;
    }
    return null;
  }

  async createAdoptReviewComment(
    input: CreateCommentInput,
    user: User,
  ): Promise<Comment> {
    if (!(user && user.userType === UserType.ADOPTEE)) {
      throw new UnauthorizedException('댓글을 작성할 권한이 없습니다.');
    }
    const { parentCommentId, postId, content } = input;
    const post: AdoptReview = await this.exceptionHandlingOfPost(postId);
    const parent: Comment = await this.exceptionHandlingOfParentComment(
      parentCommentId,
    );
    const writer: string = (
      await this.adopteeUserRepository.getOneAdopteeUserById(user.id)
    ).nickname;
    return await this.adoptReviewCommentRepository.createAdoptReviewComment({
      parent,
      post,
      writer,
      content,
    });
  }
}
