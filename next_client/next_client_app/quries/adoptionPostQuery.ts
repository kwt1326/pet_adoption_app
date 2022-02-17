import { gql } from '@apollo/client';

export const GET_ADOPTION_POST_LIST = gql`
query getPosts($input: GetAdoptionPostsArgs!) {
  getPosts(getPostsArgs: $input) {
    title
    content
    isLiked
    writter {
      nickname
      companyName
      address
      phoneNumber
      pageUri
      isAuthenticated
      isProfit
      authenticatedAt
    }
    pet {
      registrant {
        nickname
        companyName
        address
        phoneNumber
        pageUri
        isAuthenticated
        isProfit
        authenticatedAt
      }
      name
      breed
      type
      price
      age
      weight
      isGenderMale
      vaccinated
      neutered
      characteristic
      othersInfo
      pictures {
        uri
      }
    }
  }
}`;



export const CREATE_POST_MUTATION = gql`
mutation createAdoptionPost($input: CreateAdoptionPostArgs!) {
  createAdoptionPost(postArgs: $input) {
    result
    id
 }
}
`;
