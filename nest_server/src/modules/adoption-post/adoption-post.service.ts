import { Repository } from 'typeorm';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pets } from 'src/entities/pets.entity';
import { AdoptUser } from 'src/entities/adopt-user.entity';
import { AdoptionPost } from 'src/entities/adoption-post.entity';
import { CreateAdoptionPostArgs } from './dtos/create-adoption-post.dto';
import { GetAdoptionPostArgs } from './dtos/get-adoption-post.dto';
import {
  RequestOutput,
  RequestOutputObj,
} from '../common/dtos/request-result.dto';

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
  ): Promise<RequestOutput> {
    try {
      const writter = user; // TODO: @AuthUser 구현시 대체

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

      return RequestOutputObj({ id: post.id }, 200);
    } catch (error) {
      return RequestOutputObj({ error: error.message }, error.status);
    }
  }

  async findOneAdoptionPost(id: number): Promise<AdoptionPost> {
    return await this.adoptionPostRepository.findOne(id);
  }

  /**
   * 입양글 리스트 API
   *
   * @param args {page = 1, isProfit = boolean | undefined}
   * @returns AdoptionPost[]
   */
  async getAdoptionPosts(
    args: GetAdoptionPostArgs,
  ): Promise<RequestOutput<AdoptionPost[]>> {
    try {
      const take = 20;
      const where = {};

      if (args.isProfit !== undefined) {
        where['writter'] = { isProfit: args.isProfit };
      }

      return RequestOutputObj(
        await this.adoptionPostRepository.find({
          skip: take * (args.page - 1),
          take,
          where,
          relations: ['writter'],
        }),
        200,
      );
    } catch (error) {
      return RequestOutputObj({ error: error.message }, error.statusCode);
    }
  }
}
