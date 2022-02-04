import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  RelationId,
} from 'typeorm';
import { AdoptReview } from './adopt-review.entity';
import { AdopteeUser } from './adoptee-user.entity';
import { CoreEntity } from './common/core.entity';
import { ColumnTextType } from './database-data-type';

// 입양후기 댓글 - 모든 권한 작성 가능

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Comment extends CoreEntity {
  @ManyToOne(() => Comment, (comment) => comment.child, {
    nullable: true,
    cascade: true,
  })
  @JoinColumn({ name: 'parent_id' })
  @Field(() => Comment, { nullable: true })
  parent?: Comment; // 부모 댓글 pk (순환 참조)

  @OneToMany(() => Comment, (comment) => comment.parent, { nullable: true })
  @Field(() => [Comment], { nullable: true })
  child?: Comment[];

  @ManyToOne(() => AdopteeUser)
  @JoinColumn({ name: 'writer_id' })
  @Field(() => AdopteeUser)
  writer: AdopteeUser; // 작성자 pk

  @ManyToOne(() => AdoptReview, (post) => post.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'post_id' })
  @Field(() => AdoptReview, { nullable: true })
  post: AdoptReview; // 리뷰 pk

  @Column(ColumnTextType)
  @Field(() => String)
  content: string;
}
