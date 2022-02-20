import { gql } from "@apollo/client";

export const DELETE_ONE_USER = gql`
  mutation deleteOneUser($id: Float!) {
    deleteOneUser(id: $id) {
      result
    }
  }
`;
