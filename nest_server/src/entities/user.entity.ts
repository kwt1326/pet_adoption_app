import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/entities/common/core.entity';
import { Column, Entity } from 'typeorm';

type UserType = 'ADOPT_USER' | 'ADOPTEE_USER';

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
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
