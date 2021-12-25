import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreDateEntity } from 'src/entities/common/core.entity';
import { User } from './user.entity';

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class AdoptUser extends CoreDateEntity {
  // PK ref User.id
  @OneToOne(() => User, { primary: true, cascade: true })
  @JoinColumn()
  @Field(() => User)
  user: number;

  @Column({ nullable: false })
  @Field(() => String)
  nickname: string;

  @Column({ nullable: false })
  @Field(() => String)
  companyName: string;

  @Column({ nullable: false })
  @Field(() => String)
  address: string;

  @Column({ nullable: false })
  @Field(() => String)
  phoneNumber: string;

  @Column('text')
  @Field(() => String)
  pageUri: string;

  @Column({ default: false })
  @Field(() => Boolean)
  isAuthenticated: boolean;

  @Column({ nullable: false })
  @Field(() => Boolean)
  isProfit: boolean; // 일반업체 = true / 보호소 = false

  @Column({ nullable: true })
  @Field(() => Date)
  authenticatedAt: Date;
}
