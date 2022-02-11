import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum LikeResult {
  CREATE,
  DELETE,
}

registerEnumType(LikeResult, {
  name: 'LikeResult',
  description: '실행된 작업의 종류',
  valuesMap: {
    CREATE: {
      description: '좋아요 생성 작업',
    },
    DELETE: {
      description: '좋아요 삭제 작업',
    },
  },
});

@ObjectType()
export class AdoptionReviewLikeOutput {
  @Field(() => LikeResult)
  result: LikeResult;
}
