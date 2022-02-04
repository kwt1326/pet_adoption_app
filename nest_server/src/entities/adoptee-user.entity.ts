import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreDateEntity } from 'src/entities/common/core.entity';
import { User } from './user.entity';

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class AdopteeUser extends CoreDateEntity {
  // PK ref User.id
  @OneToOne(() => User, { primary: true, cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
  @Field(() => User, { nullable: true })
  user: User;

  @Column({ nullable: false, unique: true })
  @PrimaryColumn()
  @Field(() => Int)
  userId: number;

  @Column({ nullable: false })
  @Field(() => String, { nullable: true })
  nickname: string;

  @Column({ default: false })
  @Field(() => Boolean, { nullable: true })
  isAuthenticated: boolean;

  @Column({ nullable: true })
  @Field(() => Date, { nullable: true })
  authenticatedAt: Date;
}
