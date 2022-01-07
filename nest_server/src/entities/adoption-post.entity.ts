import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from './common/core.entity';
import { AdoptUser } from './adopt-user.entity';
import { Pets } from './pets.entity';

// 소개글 - 펫 하나당 하나의 글 1:1

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class AdoptionPost extends CoreEntity {
  @ManyToOne(() => AdoptUser)
  @JoinColumn()
  @Field(() => AdoptUser, { nullable: true })
  writter: AdoptUser;

  @OneToOne(() => Pets)
  @JoinColumn()
  @Field(() => Pets, { nullable: true })
  pet: Pets;

  @Column()
  @Field(() => String)
  title: string;

  @Column('text')
  @Field(() => String)
  content: string;
}
