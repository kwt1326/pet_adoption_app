import { Repository, SelectQueryBuilder } from 'typeorm';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pets, PetType } from 'src/entities/pets.entity';
import { AdoptUser } from 'src/entities/adopt-user.entity';
import { AdoptionPost } from 'src/entities/adoption-post.entity';
import {
  CreateAdoptionPostArgs,
  CreateAdoptionPostOutput,
  ToggleAdoptionPostLikeArgs,
  ToggleAdoptionPostLikeOutput,
} from './dtos/create-adoption-post.dto';
import {
  GetAdoptionPostsArgs,
  GetAdoptionPostsOutput,
} from './dtos/get-adoption-post.dto';
import { PetPicture } from 'src/entities/pet-picture.entity';
import { AdoptionPostLike } from 'src/entities/adoption-post-like.entity';
import { AdopteeUser } from 'src/entities/adoptee-user.entity';
import { User } from 'src/entities/user.entity';
import { LikeResult } from '../adopt-review/dtos/review-like.dto';

@Injectable()
export class AdoptionPostService {
  constructor(
    @InjectRepository(AdoptionPost)
    private readonly adoptionPostRepository: Repository<AdoptionPost>,
    @InjectRepository(AdoptionPostLike)
    private readonly adoptionPostLikeRepository: Repository<AdoptionPostLike>,
    @InjectRepository(PetPicture)
    private readonly petPictureRepository: Repository<PetPicture>,
    @InjectRepository(Pets)
    private readonly petsRepository: Repository<Pets>,
  ) {}

  async createAdoptionPost(
    user: AdoptUser,
    postArgs: CreateAdoptionPostArgs,
  ): Promise<CreateAdoptionPostOutput> {
    const writter = user;

    if (!writter) {
      throw new HttpException('invalid User', 401);
    }

    const pet = this.petsRepository.create({
      ...postArgs,
      registrant: writter,
    });
    await this.petsRepository.save(pet);

    if (Array.isArray(postArgs.uri)) {
      for (const uri of postArgs.uri) {
        const picture = this.petPictureRepository.create({ pet, uri });
        await this.petPictureRepository.save(picture);
      }
    }

    const post = this.adoptionPostRepository.create({
      ...postArgs,
      writter,
      pet,
    });
    await this.adoptionPostRepository.save(post);

    return { result: true, id: post.id };
  }

  async getAdoptionPost(
    user: User,
    id: number,
  ): Promise<GetAdoptionPostsOutput> {
    const result = await this.adoptionPostRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.writter', 'writter')
      .leftJoinAndSelect('post.pet', 'pet')
      .leftJoinAndSelect('post.likes', 'likes')
      .leftJoinAndSelect('likes.adoptee', 'adoptee')
      .leftJoinAndSelect('pet.pictures', 'pictures')
      .where('post.id = :id', { id })
      .getOne();

    if (!result) {
      throw new HttpException('Not Found AdoptionPost', 410);
    }
    return {
      ...result,
      isLiked: Boolean(
        result.likes.find((like) => like.adoptee.userId === user.id),
      ),
    };
  }

  async getAdoptionPosts(
    user: User,
    args: GetAdoptionPostsArgs,
  ): Promise<GetAdoptionPostsOutput[]> {
    let queryBuilder: SelectQueryBuilder<AdoptionPost> =
      this.adoptionPostRepository
        .createQueryBuilder('post')
        .leftJoinAndSelect('post.writter', 'writter')
        .leftJoinAndSelect('post.pet', 'pet')
        .leftJoinAndSelect('post.likes', 'likes')
        .leftJoinAndSelect('likes.adoptee', 'adoptee')
        .leftJoinAndSelect('pet.pictures', 'pictures');

    if (typeof args.isProfit !== 'undefined') {
      queryBuilder = queryBuilder.where('writter.isProfit = :isProfit', {
        isProfit: args.isProfit,
      });
    }

    if (typeof args.petType !== 'undefined') {
      queryBuilder = queryBuilder.where('pet.type = :type', {
        type: args.petType,
      });
    }

    const queryResult = await queryBuilder
      .skip(20 * (args.page - 1))
      .take(20)
      .orderBy('post.id', 'DESC')
      .getMany();

    return queryResult?.map((post: AdoptionPost) => ({
      ...post,
      isLiked: Boolean(
        post.likes.find((like) => like.adoptee.userId === user.id),
      ),
    }));
  }

  async createAdoptionPostLike(
    user: AdopteeUser,
    args: ToggleAdoptionPostLikeArgs,
  ): Promise<ToggleAdoptionPostLikeOutput> {
    const post = await this.adoptionPostRepository.findOne(args.postId);

    const likeEntity = this.adoptionPostLikeRepository.create({
      likePost: post,
      adoptee: user,
    });

    await this.adoptionPostLikeRepository.save(likeEntity);

    return { result: true, type: LikeResult.CREATE };
  }

  async deleteAdoptionPostLike(
    user: AdopteeUser,
    args: ToggleAdoptionPostLikeArgs,
  ): Promise<ToggleAdoptionPostLikeOutput> {
    await this.adoptionPostLikeRepository
      .createQueryBuilder()
      .delete()
      .from(AdoptionPostLike)
      .where('adopteeUserId = :id', { id: user.userId })
      .andWhere('likePostId = :postId', { postId: args.postId })
      .execute();

    return { result: true, type: LikeResult.DELETE };
  }

  async toggleAdoptionPostLike(
    user: AdopteeUser,
    args: ToggleAdoptionPostLikeArgs,
  ): Promise<ToggleAdoptionPostLikeOutput> {
    const findIt = await this.adoptionPostLikeRepository
      .createQueryBuilder('like')
      .leftJoinAndSelect('like.adoptee', 'adoptee')
      .leftJoinAndSelect('like.likePost', 'likePost')
      .where('adoptee.userId = :id', { id: user.userId })
      .andWhere('likePost.id = :postId', { postId: args.postId })
      .getOne();

    if (findIt) {
      return await this.deleteAdoptionPostLike(user, args);
    }
    return await this.createAdoptionPostLike(user, args);
  }
}
