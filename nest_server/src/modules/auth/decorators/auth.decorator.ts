import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const AuthUser = createParamDecorator(
  (_: any, context: ExecutionContext) => {
    const gqlContext = GqlExecutionContext.create(context).getContext();

    if (gqlContext.req?.user) {
      return gqlContext.req.user;
    }
    return null;
  },
);
