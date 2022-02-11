import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/entities/common/core.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Comment } from './comment.entity';

export enum UserType {
  ADOPT = 'ADOPT_USER',
  ADOPTEE = 'ADOPTEE_USER',
  ADMIN = 'ADMIN',
}

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
  @Column({ update: false, unique: true })
  @Field(() => String)
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  @Field(() => String, { nullable: true })
  userType: UserType;

  @Column({ default: true })
  @Field(() => Boolean, { nullable: true })
  isAvailable: boolean;

  @OneToMany(() => Comment, (comment) => comment.writer)
  comments: Comment[];
}
