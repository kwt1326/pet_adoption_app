import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreDateEntity } from 'src/entities/common/core.entity';
import { User } from './user.entity';
import { ColumnTextType } from './database-data-type';

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class AdoptUser extends CoreDateEntity {
  // PK ref User.id
  @OneToOne(() => User, {
    primary: true,
    cascade: true,
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'userId' })
  @Field(() => User, { nullable: true })
  user: User;

  // PK ref User.id
  @PrimaryColumn()
  userId: number;

  @Column({ nullable: false, unique: true })
  @Field(() => String, { nullable: true })
  nickname: string;

  @Column({ nullable: false })
  @Field(() => String, { nullable: true })
  companyName: string;

  @Column({ nullable: false })
  @Field(() => String, { nullable: true })
  address: string;

  @Column({ nullable: false })
  @Field(() => String, { nullable: true })
  phoneNumber: string;

  @Column(ColumnTextType)
  @Field(() => String, { nullable: true })
  pageUri: string;

  @Column({ default: false })
  @Field(() => Boolean, { nullable: true })
  isAuthenticated: boolean;

  @Column({ nullable: false })
  @Field(() => Boolean, { nullable: true })
  isProfit: boolean; // 일반업체 = true / 보호소 = false

  @Column({ nullable: true })
  @Field(() => Date, { nullable: true })
  authenticatedAt: Date;
}
