import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AdoptReview } from './adopt-review.entity';
import { CoreIdEntity } from './common/core.entity';
import { ColumnTextType } from './database-data-type';

// 입양후기 이미지 테이블

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class AdoptReviewPicture extends CoreIdEntity {
  @ManyToOne(() => AdoptReview, { onDelete: 'CASCADE'})
  @JoinColumn()
  @Field(() => AdoptReview)
  adoptReview: AdoptReview;

  @Column(ColumnTextType)
  @Field(() => String)
  uri: string;
}
