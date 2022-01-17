import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Pets } from 'src/entities/pets.entity';
import { CreatePetArgs, CreatePetOutput } from './dtos/create-pet.dto';
import { PetService } from './pet.service';

@Resolver(() => Pets)
export class PetResolver {
  constructor(private readonly petService: PetService) {}

  @Mutation(() => CreatePetOutput)
  async createPet(@Args('args') args: CreatePetArgs) {
    return await this.petService.createPet(args);
  }
}
