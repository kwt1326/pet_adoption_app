import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreIdEntity } from 'src/entities/common/core.entity';
import { AdoptUser } from './adopt-user.entity';

export enum AdoptUserPictureType {
  INTERIOR = 'interior', // 인테리어
  MAIN = 'main', // 대표 이미지
  CONTRACT = 'contract', // 매매계약서
}

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class AdoptUserPicture extends CoreIdEntity {
  @ManyToOne(() => AdoptUser)
  @JoinColumn()
  @Field(() => AdoptUser)
  adoptUser: AdoptUser;

  @Column({ nullable: false })
  @Field(() => String)
  type: AdoptUserPictureType;

  @Column('text', { nullable: false })
  @Field(() => String)
  uri: string;
}
