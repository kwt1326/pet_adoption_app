import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreIdEntity } from 'src/entities/common/core.entity';
import { AdoptUser } from './adopt-user.entity';
import { ColumnTextType } from './database-data-type';

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

  @Column(ColumnTextType, { nullable: false })
  @Field(() => String)
  uri: string;
}
