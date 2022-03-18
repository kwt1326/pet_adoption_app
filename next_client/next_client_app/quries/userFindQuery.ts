import { gql } from "@apollo/client";

export const GET_ONE_ADOPTEE_USER = gql`
  query getOneAdopteeUser($id: Float!) {
    getOneAdopteeUser(id: $id) {
      user {
        email
        userType
      }
      userId
      nickname
    }
  }
`;

export const GET_ONE_ADOPT_USER = gql`
  query getOneAdoptUser($id: Float!) {
    getOneAdoptUser(id: $id) {
      user {
        email
        userType
      }
      userId
      nickname
    }
  }
`;

export const GET_ADOPT_USER_DETAIL = gql`
  query getOneAdoptUser($id: Float!) {
    getOneAdoptUser(id: $id) {
      userId
      companyName
      address
      phoneNumber
      pageUri
      isAuthenticated
    }
  }
`;

export const GET_ALL_ADOPTEE_USER = gql`
  query getAllAdopteeUser {
    getAllAdopteeUser {
      user {
        id
        email
        userType
      }
      userId
      nickname
    }
  }
`;

export const GET_ALL_ADOPT_USER = gql`
  query getAllAdoptUser {
    getAllAdoptUser {
      user {
        id
        email
        userType
      }
      nickname
      companyName
      address
      phoneNumber
      pageUri
      isAuthenticated
      isProfit
    }
  }
`;
