import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/entities/common/core.entity';
import { AdoptUser } from 'src/entities/adopt-user.entity';

// 펫 데이터 - 업체만 생성 가능, 소개글 작성시 추가

type PetType = 'dog' | 'cat';

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Pets extends CoreEntity {
  @ManyToOne(() => AdoptUser)
  @JoinColumn()
  @Field(() => AdoptUser)
  registrant: AdoptUser;

  @Column({ nullable: false })
  @Field(() => String)
  name: string; // 애완동물 이름

  @Column({ nullable: false })
  @Field(() => String)
  breed: string; // 품종 (품종은 종이 너무많아 텍스트로 입력)

  @Column({ nullable: false })
  @Field(() => String)
  type: PetType; // 강아지 / 고양이

  @Column({ default: 0 })
  @Field(() => Number)
  price: number; // 분양가

  @Column({ default: 0 })
  @Field(() => Number)
  age: number; // 나이

  @Column({ default: 0 })
  @Field(() => Number)
  weight: number; // 몸무게

  @Column({ nullable: false })
  @Field(() => Boolean)
  isGenderMale: boolean; // 성별 - 수컷: true / 암컷 : false

  @Column({ default: false })
  @Field(() => Boolean)
  vaccinated: boolean; // 예방접종 여부

  @Column({ default: false })
  @Field(() => Boolean)
  neutered: boolean; // 중성화 여부

  @Column('text', { nullable: true })
  @Field(() => String)
  characteristic: string; // 특징 // nullable

  @Column('text', { nullable: true })
  @Field(() => String)
  othersInfo: string; // 기타정보 // nullable
}
