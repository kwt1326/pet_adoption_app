import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdoptionPost } from 'src/entities/adoption-post.entity';
import { Pets } from 'src/entities/pets.entity';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '../auth/jwt.service';
import { PetService } from '../pet/pet.service';
import {
  AdopteeUserRepository,
  AdoptUserRepository,
  UserRepository,
} from '../user/user.repository';
import { UserService } from '../user/user.service';
import { AdoptionPostResolver } from './adoption-post.resolver';
import { AdoptionPostService } from './adoption-post.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AdoptionPost,
      Pets,
      UserRepository,
      AdoptUserRepository,
      AdopteeUserRepository,
    ]),
  ],
  providers: [
    AdoptionPostResolver,
    AdoptionPostService,
    PetService,
    UserService,
    AuthService,
    JwtService,
  ],
  exports: [AdoptionPostService],
})
export class AdoptionPostModule {}
