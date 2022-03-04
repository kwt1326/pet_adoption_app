import { gql } from "@apollo/client";

export const DELETE_ONE_USER = gql`
  mutation deleteOneUser($id: Float!) {
    deleteOneUser(id: $id) {
      result
    }
  }
`;

export const UPDATE_ADOPTEE_USER = gql`
  mutation updateAdopteeUser($input: UpdateAdopteeUserInput!) {
    updateAdopteeUser(input: $input) {
      user {
        email
      }
      userId
      nickname
    }
  }
`;

export const UPDATE_ADOPT_USER = gql`
  mutation updateAdoptUser($input: UpdateAdoptUserInput!) {
    updateAdoptUser(input: $input) {
      user {
        email
      }
      userId
      nickname
    }
  }
`;
