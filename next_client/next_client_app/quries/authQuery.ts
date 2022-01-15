import { gql } from "@apollo/client";

export const LOGIN_QUERY = gql`
  query login($input: LoginInput!) {
    login(input: $input) {
      result
      statusCode
    }
  }
`;

export const SIGN_UP_QUERY = gql`
  mutation createAdopteeAccount($input: CreateAccountAdopteeUserInput!) {
    createAdopteeAccount(input: $input) {
      error {
        statusCode
        message
      }
      data
    }
  }
`;

export const SIGN_UP_QUERY2 = gql`
  mutation createAdoptAccount($input: CreateAccountAdoptUserInput!) {
    createAdoptAccount(input: $input) {
      error {
        statusCode
        message
      }
      data
    }
  }
`;

