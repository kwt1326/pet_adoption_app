import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
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
  @ManyToOne(() => AdopteeUser, { onDelete: 'CASCADE' })
  @JoinColumn()
  @Field(() => AdopteeUser, { nullable: true })
  adopteeUser: AdopteeUser;

  @Column()
  @Field(() => String)
  title: string;

  @Column(ColumnTextType)
  @Field(() => String)
  content: string;

  @OneToMany(() => AdoptReviewPicture, (picture) => picture.adoptReview, {
    nullable: true,
  })
  @Field(() => [AdoptReviewPicture], { nullable: true })
  pictures?: AdoptReviewPicture[];

  @OneToMany(() => AdoptionReviewLike, (like) => like.likePost, {
    nullable: true,
  })
  @Field(() => [AdoptionReviewLike], { nullable: true })
  likes?: AdoptionReviewLike[];

  @OneToMany(() => Comment, (comment) => comment.post, {
    nullable: true,
  })
  @Field(() => [Comment], { nullable: true })
  comments?: Comment[];
}
