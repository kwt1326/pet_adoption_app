import { gql } from "@apollo/client";

export const LOGIN_QUERY = gql`
  query login($input: LoginInput!) {
    login(input: $input) {
      result
      statusCode
    }
  }
`

export const SIGN_UP_QUERY = gql``