import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pets } from 'src/entities/pets.entity';
import { CreatePetArgs } from './dtos/create-pet.dto';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pets) private readonly petsRepository: Repository<Pets>,
  ) {}

  async createPet(inputs: CreatePetArgs) {
    const pet = this.petsRepository.create(inputs);
    return this.petsRepository.save(pet);
  }
}
