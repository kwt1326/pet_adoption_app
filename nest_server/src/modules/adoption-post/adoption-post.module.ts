import { Module } from '@nestjs/common';
import { AdoptionPostResolver } from './adoption-post.resolver';
import { AdoptionPostService } from './adoption-post.service';

@Module({
  providers: [AdoptionPostResolver, AdoptionPostService],
})
export class AdoptionPostModule {}
