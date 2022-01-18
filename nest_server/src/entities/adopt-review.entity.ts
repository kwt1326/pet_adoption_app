import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AdopteeUser } from './adoptee-user.entity';
import { CoreEntity } from './common/core.entity';

// 입양후기 - 입양자(adoptee_user)만 작성가능

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class AdoptReview extends CoreEntity {
  @ManyToOne(() => AdopteeUser, { onDelete: 'CASCADE' })
  @JoinColumn()
  @Field(() => AdopteeUser)
  adopteeUser: AdopteeUser;

  @Column()
  @Field(() => String)
  title: string;

  @Column('text')
  @Field(() => String)
  content: string;
}
