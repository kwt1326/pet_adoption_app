import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  RelationId,
} from 'typeorm';
import { AdoptReviewPicture } from './adopt-review-picture.entity';
import { AdoptionReviewLike } from './adopt-review-like.entity';
import { AdopteeUser } from './adoptee-user.entity';
import { CoreEntity } from './common/core.entity';
import { ColumnTextType } from './database-data-type';
import { Comment } from './comment.entity';

// 입양후기 - 입양자(adoptee_user)만 작성가능

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class AdoptReview extends CoreEntity {
  @ManyToOne(() => AdopteeUser, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'userId' })
  @Field(() => AdopteeUser, { nullable: true })
  adopteeUser: AdopteeUser;

  @Field(() => Int, { nullable: true })
  userId: number;

  @Column()
  @Field(() => String)
  title: string;

  @Column(ColumnTextType)
  @Field(() => String)
  content: string;

  @OneToMany(() => AdoptReviewPicture, (picture) => picture.adoptReview, {
    nullable: true,
    eager: true,
  })
  @Field(() => [AdoptReviewPicture], { nullable: true })
  pictures?: AdoptReviewPicture[];

  @OneToMany(() => AdoptionReviewLike, (like) => like.likePost, {
    nullable: true,
    eager: true,
  })
  @Field(() => [AdoptionReviewLike], { nullable: true })
  likes?: AdoptionReviewLike[];

  @RelationId((review: AdoptReview) => review.likes)
  @Field(() => [Int], { nullable: true })
  likeIds?: number[];

  @OneToMany(() => Comment, (comment) => comment.post, {
    nullable: true,
    eager: true,
  })
  @Field(() => [Comment], { nullable: true })
  comments?: Comment[];
}
