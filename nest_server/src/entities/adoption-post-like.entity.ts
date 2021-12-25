import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AdopteeUser } from './adoptee-user.entity';
import { AdoptionPost } from './adoption-post.entity';
import { CoreIdEntity } from './common/core.entity';

// '찜(하트)' 테이블 - 입양자만 사용

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class AdoptionPostLike extends CoreIdEntity {
  @ManyToOne(() => AdopteeUser)
  @JoinColumn()
  @Field(() => AdopteeUser)
  adopteeUser: AdopteeUser;

  @ManyToOne(() => AdoptionPost)
  @JoinColumn()
  @Field(() => AdoptionPost)
  likePost: AdoptionPost;
}
