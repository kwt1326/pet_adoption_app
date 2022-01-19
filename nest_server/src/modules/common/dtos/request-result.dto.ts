/* eslint-disable @typescript-eslint/ban-types */
import { Field, Int, ObjectType } from '@nestjs/graphql';
import JSON from 'graphql-type-json';

@ObjectType()
export class DeleteRequestOutput {
  @Field(() => Int, {
    description: `
    The number of records affected by the request.
    `
  })
  result: number;
}

@ObjectType()
export class RequestOutput<ResultT = {}> {
  @Field(() => JSON, { defaultValue: {} })
  result: ResultT;

  @Field(() => Number, { defaultValue: 200, nullable: true }) // 200: common success
  statusCode: number;
}

export const RequestOutputObj = (result, statusCode = 200) => ({
  result,
  statusCode,
});
