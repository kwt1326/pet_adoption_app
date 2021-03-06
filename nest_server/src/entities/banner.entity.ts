import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BannerContent } from './banner-content.entity';
import { CoreIdEntity } from './common/core.entity';
import { ColumnTextType } from './database-data-type';

// 배너정보

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Banner extends CoreIdEntity {
  @OneToOne(() => BannerContent, { cascade: true })
  @JoinColumn()
  @Field(() => BannerContent)
  content: BannerContent;

  @Column(ColumnTextType)
  @Field(() => String)
  thumbnailUri: string;
}
