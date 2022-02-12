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
      token
    }
  }
`;

export const CORP_SIGN_UP_QUERY = gql`
  mutation createAdoptAccount($input: CreateAccountAdoptUserInput!) {
    createAdoptAccount(input: $input) {
      token
    }
  }
`;

export const CHECK_DUPLICATE = gql`
  query checkDuplicateField($input: CheckDuplicateFieldInput!) {
    checkDuplicateField(input: $input) {
      result
    }
  }
`;
