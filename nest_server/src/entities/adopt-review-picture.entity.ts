import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AdoptReview } from './adopt-review.entity';
import { CoreIdEntity } from './common/core.entity';
import { ColumnTextType } from './database-data-type';

// 입양후기 이미지 테이블

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class AdoptReviewPicture extends CoreIdEntity {
  @ManyToOne(() => AdoptReview, (adoptReview) => adoptReview.pictures, {
    nullable: false,
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'reviewId' })
  @Field(() => AdoptReview, { nullable: true })
  adoptReview: AdoptReview;

  @Field(() => Int, { nullable: true })
  reviewId: number;

  @Column(ColumnTextType)
  @Field(() => String)
  uri: string;
}
