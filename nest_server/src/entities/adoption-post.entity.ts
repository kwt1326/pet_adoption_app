import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  RelationId,
} from 'typeorm';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from './common/core.entity';
import { AdoptUser } from './adopt-user.entity';
import { Pets } from './pets.entity';
import { ColumnTextType } from './database-data-type';

// 소개글 - 펫 하나당 하나의 글 1:1

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class AdoptionPost extends CoreEntity {
  @ManyToOne(() => AdoptUser)
  @JoinColumn({ name: 'writterId' })
  @Field(() => AdoptUser, { nullable: true })
  writter: AdoptUser;

  @OneToOne(() => Pets, (pet) => pet.id, { cascade: true })
  @JoinColumn()
  @Field(() => Pets, { nullable: true })
  pet: Pets;

  @Column()
  @Field(() => String)
  title: string;

  @Column(ColumnTextType)
  @Field(() => String)
  content: string;
}
