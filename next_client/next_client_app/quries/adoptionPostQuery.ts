import { gql } from '@apollo/client';

export const GET_RECENTLY_ADOPTION_POST_LIST = gql`
  query getRecentlyPosts {
    getRecentlyPosts {
      dog {
        id
        title
        isLiked
        createdAt
        writter {
          isProfit
        }
        pet {
          breed
          price
          isGenderMale
          pictures {
            uri
          }  
        }
      }
      cat {
        id
        title
        content
        isLiked
        createdAt
        writter {
          isProfit
        }
        pet {
          breed
          price
          isGenderMale
          createdAt
          pictures {
            uri
          }  
        }
      }
    }
  }
`

export const GET_ADOPTION_POST_LIST = gql`
  query getPosts($input: GetAdoptionPostsArgs!) {
    getPosts(getPostsArgs: $input) {
      id
      title
      content
      isLiked
      createdAt
      writter {
        isProfit
        companyName
        phoneNumber
        address
      }
      pet {
        name
        age
        breed
        price
        isGenderMale
        createdAt
        vaccinated
        weight
        neutered
        characteristic
        othersInfo
        pictures {
          uri
        }  
      }
    }
  }
`;

export const CREATE_POST_MUTATION = gql`
  mutation createAdoptionPost($input: CreateAdoptionPostArgs!) {
    createAdoptionPost(postArgs: $input) {
      result
      id
    }
  }
`;

export const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleAdoptionPostLike($input: ToggleAdoptionPostLikeArgs!) {
    toggleAdoptionPostLike(likeArgs: $input) {
      result
      type
    }
  }
`;
