import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { CoreIdEntity } from './common/core.entity';

// 배너 페이지 컨텐츠 - '관리자'권한 작성가능(임시로 db에 직접작성)

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class BannerContent extends CoreIdEntity {
  @Column()
  @Field(() => String)
  title: string;

  @Column('text')
  @Field(() => String)
  detailContent: string;
}
