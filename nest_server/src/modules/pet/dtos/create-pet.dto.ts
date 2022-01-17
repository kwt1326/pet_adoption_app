import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Pets } from 'src/entities/pets.entity';

@InputType()
export class CreatePetArgs extends PickType(Pets, [
  'name',
  'breed',
  'type',
  'price',
  'age',
  'weight',
  'isGenderMale',
  'vaccinated',
  'neutered',
  'characteristic',
  'othersInfo',
] as const) {}

@ObjectType()
export class CreatePetOutput extends Pets {}
