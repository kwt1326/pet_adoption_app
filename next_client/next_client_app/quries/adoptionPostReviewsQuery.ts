import { gql } from '@apollo/client';

export const CREATE_POST_ADOPTREVIEW = gql`
  mutation createAdoptReview ($input: CreateReviewInput!) {
    createAdoptReview (input : $input ) {
      title
      content
    }
  }
`

export const QUERY_ADOPTREVIEW_LIST = gql`
  query getAdoptReviews($input: GetAdoptReviewsArgs!) {
    getAdoptReviews(getAdoptReviewsArgs: $input) {
      id
      title
      content   
      adopteeUser {
        nickname
      }
      createdAt
      pictures
      {
        uri
      }
      likes {
        userId
        reviewId
      }
      comments 
      {
        id
        parentId
        writerNickname
        content
        child {
          id
          parentId
          writerNickname
          content
        }
      }
    }
  }
`;

export const QUERY_ADOPTREVIEW = gql`
  query getOneAdoptReview($input: Float!) {
    getOneAdoptReview(id: $input) {
      id
      title
      content   
      adopteeUser 
      {
        nickname
      }
      createdAt
      pictures
      {
        uri
      }
      likes {
        userId
        reviewId
      }
      comments 
      {
        id
        parentId
        writerNickname
        child {
          id
          parentId
          writerNickname
          content
        }
        content
      }
    }
  }
`;

export const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleAdoptionReviewLike($input: Float!) {
    toggleAdoptionReviewLike(reviewId: $input) {
      result
    }
  }
`

export const CREATE_POST_ADOPTREVIEW_COMMENT = gql`
  mutation createAdoptReviewComment ($input: CreateCommentInput!) {
    createAdoptReviewComment (input : $input ) {
      id
      parentId
      writerId
      writerNickname
      postId
      content
    }
  }
`
