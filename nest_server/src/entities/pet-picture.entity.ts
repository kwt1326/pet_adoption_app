import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreIdEntity } from 'src/entities/common/core.entity';
import { Pets } from './pets.entity';

// 펫 이미지 테이블

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class PetPicture extends CoreIdEntity {
  @ManyToOne(() => Pets)
  @JoinColumn()
  @Field(() => Pets)
  pet: Pets;

  @Column('text', { nullable: false })
  @Field(() => String)
  uri: string;
}
