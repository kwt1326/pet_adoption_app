import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreDateEntity } from 'src/entities/common/core.entity';
import { User } from './user.entity';

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class AdopteeUser extends CoreDateEntity {
  // PK ref User.id
  @OneToOne(() => User, { primary: true })
  @JoinColumn()
  @Field(() => User)
  user: number;

  @Column({ nullable: false })
  @Field(() => String)
  nickname: string;

  @Column({ default: false })
  @Field(() => Boolean)
  isAuthenticated: boolean;

  @Column({ nullable: true })
  @Field(() => Date)
  authenticatedAt: Date;
}