import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreIdEntity } from 'src/entities/common/core.entity';
import { Pets } from './pets.entity';
import { ColumnTextType } from './database-data-type';

// 펫 이미지 테이블

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class PetPicture extends CoreIdEntity {
  @ManyToOne(() => Pets, (pet) => pet.pictures, {
    nullable: false,
    cascade: true,
    onDelete: 'CASCADE',
  })
  @Field(() => Pets)
  pet: Pets;

  @Column(ColumnTextType, { nullable: false })
  @Field(() => String)
  uri: string;
}
