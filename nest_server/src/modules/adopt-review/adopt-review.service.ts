import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdoptReview } from 'src/entities/adopt-review.entity';
import { AdopteeUser } from 'src/entities/adoptee-user.entity';
import { DeleteRequestOutput } from '../common/dtos/request-result.dto';
import {
  AdopteeUserRepository,
  AdoptUserRepository,
} from '../user/user.repository';
import {
  AdoptionReviewLikeRepository,
  AdoptReviewCommentRepository,
  AdoptReviewPictureRepository,
  AdoptReviewRepository,
} from './adopt-review.repository';
import { AdoptionReviewLikeOutput, LikeResult } from './dtos/review-like.dto';
import { CreateReviewInput } from './dtos/create-review.dto';
import {
  UpdateAdoptReviewCommentInput,
  UpdateAdoptReviewInput,
} from './dtos/update-review.dto';
import { CreateAdoptReviewPictureInput } from './dtos/create-review-picture.dto';
import { CreateCommentInput } from './dtos/create-comment.dto';
import { User, UserType } from 'src/entities/user.entity';
import { Comment } from 'src/entities/comment.entity';
import {
  GetAdoptReviewOutput,
  GetAdoptReviewsArgs,
} from './dtos/get-adopt-reviews.dto';

@Injectable()
export class AdoptReviewService {
  constructor(
    @InjectRepository(AdoptReviewRepository)
    private readonly adoptReviewRepository: AdoptReviewRepository,

    @InjectRepository(AdopteeUserRepository)
    private readonly adopteeUserRepository: AdopteeUserRepository,

    @InjectRepository(AdopteeUserRepository)
    private readonly adoptUserRepository: AdoptUserRepository,

    @InjectRepository(AdoptReviewPictureRepository)
    private readonly adoptReviewPictureRepository: AdoptReviewPictureRepository,

    @InjectRepository(AdoptionReviewLikeRepository)
    private readonly adoptionReviewLikeRepository: AdoptionReviewLikeRepository,

    @InjectRepository(AdoptReviewCommentRepository)
    private readonly adoptReviewCommentRepository: AdoptReviewCommentRepository,
  ) {}

  async createAdoptReview(
    user: User,
    createReviewInput: CreateReviewInput,
  ): Promise<AdoptReview> {
    if (!(user && user.userType === UserType.ADOPTEE)) {
      throw new UnauthorizedException('게시물을 생성할 권한이 없습니다.');
    }
    const { uris, ...createInput } = createReviewInput;
    const adopteeUser: AdopteeUser =
      await this.adopteeUserRepository.getOneAdopteeUserById(user.id);
    const adoptReview: AdoptReview =
      await this.adoptReviewRepository.createAndSaveReview(
        adopteeUser,
        createInput,
      );
    await this.createAdoptReviewPictures(adoptReview, uris);
    return adoptReview;
  }

  async createAdoptReviewPictures(
    adoptReview: AdoptReview,
    uris: string[],
  ): Promise<void> {
    if (uris) {
      uris.forEach(async (uri) => {
        await this.adoptReviewPictureRepository.createAdoptReviewPicture({
          adoptReview,
          uri,
        });
      });
    }
  }

  async getReviewWithCheckingNotFound(reviewId: number): Promise<AdoptReview> {
    const review: AdoptReview =
      await this.adoptReviewRepository.getOneAdoptReviewById(reviewId);
    if (!review) {
      throw new NotFoundException('존재하지 않는 게시물입니다.');
    }
    return review;
  }

  async getReviewWithVerifyingAuthority(
    reviewId: number,
    userId,
  ): Promise<AdoptReview> {
    const review = await this.getReviewWithCheckingNotFound(reviewId);
    if (review.userId !== userId) {
      throw new UnauthorizedException('해당 요청에 대한 권한이 없습니다.');
    }
    return review;
  }

  async getOneAdoptReview(
    id: number,
    user: User,
  ): Promise<GetAdoptReviewOutput> {
    const review = await this.getReviewWithCheckingNotFound(id);
    return this.getAdoptReviewWithIsLiked(review, user.id);
  }

  async getAdoptReviews(
    getAdoptReviewsArgs: GetAdoptReviewsArgs,
    user: User,
  ): Promise<GetAdoptReviewOutput[]> {
    const reviews = await this.adoptReviewRepository.getAdoptReviews(
      getAdoptReviewsArgs,
    );
    const reviewsWithIsLiked: GetAdoptReviewOutput[] =
      this.getAdoptReviewsWithIsLiked(reviews, user.id);
    return reviewsWithIsLiked;
  }

  getAdoptReviewsWithIsLiked(
    reviews: AdoptReview[],
    userId: number,
  ): GetAdoptReviewOutput[] {
    return reviews.map((review) =>
      this.getAdoptReviewWithIsLiked(review, userId),
    );
  }

  getAdoptReviewWithIsLiked(
    review: AdoptReview,
    userId: number,
  ): GetAdoptReviewOutput {
    return {
      ...review,
      isLiked: this.isAlreadyInLikes(review, userId),
    };
  }

  isAlreadyInLikes(review: AdoptReview, userId: number): boolean {
    return review.likes.some((like) => like.userId === userId);
  }

  async updateAdoptReview(
    updateReviewInput: UpdateAdoptReviewInput,
    user: User,
  ): Promise<AdoptReview> {
    const { id, uris, ...restOfUpdateInput } = updateReviewInput;
    const review = await this.getReviewWithVerifyingAuthority(id, user.id);
    await this.updateAdoptReviewPictures(review, uris);
    return await this.adoptReviewRepository.updateAdoptReview(
      review,
      restOfUpdateInput,
    );
  }

  async updateAdoptReviewPictures(
    review: AdoptReview,
    uris: string[],
  ): Promise<void> {
    const filteredUris = uris.filter(
      (uri) => !review.pictures.map((picture) => picture.uri).includes(uri),
    );
    await this.createAdoptReviewPictures(review, filteredUris);
  }

  async deleteAdoptReview(
    id: number,
    user: User,
  ): Promise<DeleteRequestOutput> {
    await this.getReviewWithVerifyingAuthority(id, user.id);
    const deleteResult: DeleteRequestOutput = {
      result: (await this.adoptReviewRepository.deleteOneUserById(id)).affected,
    };
    return deleteResult;
  }

  async deleteAdoptReviewPicture(id: number, user: User) {
    await this.getReviewWithVerifyingAuthority(id, user.id);
    const resOutput: DeleteRequestOutput = {
      result: (
        await this.adoptReviewPictureRepository.deleteAdoptReviewPicture(id)
      ).affected,
    };
    return resOutput;
  }

  async toggleAdoptionReviewLike(
    reviewId: number,
    user: User,
  ): Promise<AdoptionReviewLikeOutput> {
    const resOutput: AdoptionReviewLikeOutput = {
      result: LikeResult.CREATE,
    };
    const review = await this.getReviewWithCheckingNotFound(reviewId);
    if (user.userType !== UserType.ADOPTEE) {
      throw new UnauthorizedException('해당 요청에 대한 권한이 없습니다.');
    }
    if (this.isAlreadyInLikes(review, user.id)) {
      await this.adoptionReviewLikeRepository.deleteAdoptionReviewLike({
        reviewId,
        userId: user.id,
      });
      resOutput.result = LikeResult.DELETE;
    } else {
      const adopteeUser =
        await this.adopteeUserRepository.getOneAdopteeUserById(user.id);
      await this.adoptionReviewLikeRepository.createAdoptionReviewLike(
        adopteeUser,
        review,
      );
    }
    return resOutput;
  }

  async getCommentWithCheckingNotFound(commentId: number) {
    const comment = await this.adoptReviewCommentRepository.findOneCommentById(
      commentId,
    );
    if (!comment) {
      throw new NotFoundException('댓글이 존재하지 않습니다.');
    }
    return comment;
  }

  async getCommentWithVerifyingAuthority(commentId: number, userId: number) {
    const comment = await this.getCommentWithCheckingNotFound(commentId);
    if (comment.writerId !== userId) {
      throw new UnauthorizedException('해당 요청에 대한 권한이 없습니다.');
    }
    return comment;
  }

  async createAdoptReviewComment(
    input: CreateCommentInput,
    user: User,
  ): Promise<Comment> {
    const { parentCommentId, postId, content } = input;
    const post: AdoptReview = await this.getReviewWithCheckingNotFound(postId);
    const parent: Comment = parentCommentId
      ? await this.getCommentWithCheckingNotFound(parentCommentId)
      : null;
    const { nickname: writerNickname } =
      user.userType === UserType.ADOPTEE
        ? await this.adopteeUserRepository.getOneAdopteeUserById(user.id)
        : await this.adoptUserRepository.getOneAdoptUserById(user.id);
    return await this.adoptReviewCommentRepository.createAdoptReviewComment({
      parent,
      post,
      writer: user,
      writerNickname,
      content,
    });
  }

  async deleteAdoptReviewComment(
    user: User,
    id: number,
  ): Promise<DeleteRequestOutput> {
    await this.getCommentWithVerifyingAuthority(id, user.id);
    const resOutput: DeleteRequestOutput = {
      result: (
        await this.adoptReviewCommentRepository.deleteAdoptReviewComment(id)
      ).affected,
    };
    return resOutput;
  }

  async updateAdoptReviewComment(
    updateCommentInput: UpdateAdoptReviewCommentInput,
    user: User,
  ) {
    const { id: commentId } = updateCommentInput;
    const comment: Comment = await this.getCommentWithVerifyingAuthority(
      commentId,
      user.id,
    );
    return await this.adoptReviewCommentRepository.updateAdoptReviewComment(
      comment,
      updateCommentInput,
    );
  }
}
