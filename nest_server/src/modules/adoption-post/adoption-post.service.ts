import { Repository } from 'typeorm';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pets } from 'src/entities/pets.entity';
import { AdoptUser } from 'src/entities/adopt-user.entity';
import { AdoptionPost } from 'src/entities/adoption-post.entity';
import {
  CreateAdoptionPostArgs,
  CreateAdoptionPostOutput,
} from './dtos/create-adoption-post.dto';
import { GetAdoptionPostArgs } from './dtos/get-adoption-post.dto';

@Injectable()
export class AdoptionPostService {
  constructor(
    @InjectRepository(AdoptionPost)
    private readonly adoptionPostRepository: Repository<AdoptionPost>,
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

    const post = this.adoptionPostRepository.create({
      ...postArgs,
      writter,
      pet,
    });
    await this.adoptionPostRepository.save(post);

    return { result: true, id: post.id };
  }

  async getAdoptionPost(id: number): Promise<AdoptionPost> {
    const result = await this.adoptionPostRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.writter', 'writter')
      .leftJoinAndSelect('post.pet', 'pet')
      .where('post.id = :id', { id })
      .getOne();

    if (!result) {
      throw new HttpException('Not Found AdoptionPost', 410);
    }
    return result;
  }

  async getAdoptionPosts(args: GetAdoptionPostArgs): Promise<AdoptionPost[]> {
    const queryResult =
      typeof args.isProfit !== 'undefined'
        ? await this.adoptionPostRepository
            .createQueryBuilder('post')
            .leftJoinAndSelect('post.writter', 'writter')
            .leftJoinAndSelect('post.pet', 'pet')
            .skip(20 * (args.page - 1))
            .take(20)
            .where('writter.isProfit = :isProfit', { isProfit: args.isProfit })
            .getMany()
        : await this.adoptionPostRepository
            .createQueryBuilder('post')
            .leftJoinAndSelect('post.writter', 'writter')
            .leftJoinAndSelect('post.pet', 'pet')
            .skip(20 * (args.page - 1))
            .take(20)
            .getMany();

    return queryResult;
  }
}
