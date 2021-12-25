import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AdoptReview } from './adopt-review.entity';
import { CoreEntity } from './common/core.entity';
import { User } from './user.entity';

// 입양후기 댓글 - 모든 권한 작성 가능

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Comment extends CoreEntity {
  @ManyToOne(() => Comment)
  @JoinColumn()
  @Field(() => Comment)
  parent: Comment; // 부모 댓글 pk (순환 참조)

  @ManyToOne(() => User)
  @JoinColumn()
  @Field(() => User)
  writter: User; // 작성자 pk

  @ManyToOne(() => AdoptReview)
  @JoinColumn()
  @Field(() => AdoptReview)
  post: AdoptReview; // 리뷰 pk

  @Column('text')
  @Field(() => String)
  content: string;
}
