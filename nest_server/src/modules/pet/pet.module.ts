import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pets } from 'src/entities/pets.entity';
import { PetResolver } from './pet.resolver';
import { PetService } from './pet.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pets])],
  providers: [PetResolver, PetService],
})
export class PetModule {}
