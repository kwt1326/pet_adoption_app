import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AdopteeUser } from './adoptee-user.entity';
import { AdoptionPost } from './adoption-post.entity';
import { CoreIdEntity } from './common/core.entity';

// '좋아요(하트)' 테이블 - 입양자만 사용

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class AdoptionReviewLike extends CoreIdEntity {
  @ManyToOne(() => AdopteeUser, { onDelete: 'CASCADE'})
  @JoinColumn()
  @Field(() => AdopteeUser)
  adopteeUser: AdopteeUser;

  @ManyToOne(() => AdoptionPost, { onDelete: 'CASCADE'})
  @JoinColumn()
  @Field(() => AdoptionPost)
  likePost: AdoptionPost;
}
