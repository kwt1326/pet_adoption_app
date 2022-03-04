import { gql } from "@apollo/client";

export const DELETE_ONE_USER = gql`
  mutation deleteOneUser($id: Float!) {
    deleteOneUser(id: $id) {
      result
    }
  }
`;

export const ADOPTEE_USER = gql`
  mutation adopteeUser($input: UpdateAdopteeUserInput!) {
    adopteeUser(input: $input) {
      user {
        email
      }
      userId
    }
  }
`;

export const ADOPT_USER = gql`
  mutation adopteeUser($input: UpdateAdoptUserInput!) {
    adopteeUser(input: $input) {
      user {
        email
      }
      userId
    }
  }
`;
