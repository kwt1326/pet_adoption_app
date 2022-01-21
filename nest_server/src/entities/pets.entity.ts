import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/entities/common/core.entity';
import { AdoptUser } from 'src/entities/adopt-user.entity';
import { ColumnTextType } from './database-data-type';

// 펫 데이터 - 업체만 생성 가능, 소개글 작성시 추가

/**
 * 입력 예시
 * 
		name: "요크셔1",
		breed: "요크셔테리어",
		type: "dog",
		price: 3000000,
		age: 1,
		weight: 5.5,
		isGenderMale: false,
		vaccinated: false,
		neutered: false,
		characteristic: "잘 뛰어다녀요~!",
		othersInfo: "낮선 사람에게도 순종적입니다!"
 */

export enum PetType {
  DOG = 'dog',
  CAT = 'cat',
}

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Pets extends CoreEntity {
  @ManyToOne(() => AdoptUser)
  @JoinColumn({ name: 'registrantId' })
  @Field(() => AdoptUser, { nullable: true })
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
  @Field(() => Boolean, { nullable: true })
  isGenderMale: boolean; // 성별 - 수컷: true / 암컷 : false

  @Column({ default: false })
  @Field(() => Boolean, { nullable: true })
  vaccinated: boolean; // 예방접종 여부

  @Column({ default: false })
  @Field(() => Boolean, { nullable: true })
  neutered: boolean; // 중성화 여부

  @Column(ColumnTextType, { nullable: true })
  @Field(() => String, { nullable: true })
  characteristic: string; // 특징 // nullable

  @Column(ColumnTextType, { nullable: true })
  @Field(() => String, { nullable: true })
  othersInfo: string; // 기타정보 // nullable
}
