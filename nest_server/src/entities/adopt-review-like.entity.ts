import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { AdoptReview } from './adopt-review.entity';
import { AdopteeUser } from './adoptee-user.entity';
import { CoreIdEntity } from './common/core.entity';

// '좋아요(하트)' 테이블 - 입양자만 사용

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
@Unique(['adopteeUser', 'likePost'])
export class AdoptionReviewLike extends CoreIdEntity {
  @ManyToOne(() => AdopteeUser, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  adopteeUser: AdopteeUser;

  @Column()
  @Field(() => Int, { nullable: true })
  userId: number;

  @ManyToOne(() => AdoptReview, (review) => review.likes, {
    nullable: false,
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'reviewId' })
  likePost: AdoptReview;

  @Column()
  @Field(() => Int, { nullable: true })
  reviewId: number;
}
