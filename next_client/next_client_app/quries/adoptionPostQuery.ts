import { gql } from '@apollo/client';

export const GET_ADOPTION_POST_LIST = gql`
  query getPosts($input: GetAdoptionPostArgs!) {
    getPosts(getPostsArgs: $input) {
      result
    	statusCode
    }
  }
`;