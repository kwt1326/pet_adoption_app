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
    return await this.adoptionPostRepository.findOne(id);
  }

  async getAdoptionPosts(args: GetAdoptionPostArgs): Promise<AdoptionPost[]> {
    const take = 20;
    const where = {};

    if (args.isProfit !== undefined) {
      where['writter'] = { isProfit: args.isProfit };
    }

    return await this.adoptionPostRepository.find({
      skip: take * (args.page - 1),
      take,
      where,
      relations: ['writter'],
    });
  }
}
