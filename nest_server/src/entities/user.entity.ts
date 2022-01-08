import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/entities/common/core.entity';
import { Column, Entity, Unique } from 'typeorm';

export enum UserType {
  ADOPT = 'ADOPT_USER',
  ADOPTEE = 'ADOPTEE_USER',
}

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
@Unique(['email'])
export class User extends CoreEntity {
  @Column({ update: false })
  @Field(() => String)
  email: string;

  @Column({ nullable: false })
  @Field(() => String)
  password: string;

  @Column({ nullable: false })
  @Field(() => String)
  userType: UserType;

  @Column({ default: false })
  @Field(() => Boolean)
  isAvailable: boolean;
}
