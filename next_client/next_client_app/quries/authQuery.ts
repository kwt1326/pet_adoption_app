import { gql } from "@apollo/client";

export const LOGIN_QUERY = gql`
  query login($input: LoginInput!) {
    login(input: $input) {
      result
      statusCode
    }
  }
`;
//query 중에서 login이라는 쿼리를 호출할 것이다. 받을 데이터는 result와 statusCode이다.

export const SIGN_UP_QUERY = gql`
  mutation createAdopteeAccount($input: CreateAccountAdopteeUserInput!) {
    createAdopteeAccount(input: $input) {
      error
      data
    }
  }
`;

/*mutation 이름(variables의 input 가리킴: 타입정의해놓은거){ //variables에 적어놓은 것들의 타입 정의하기
    ??(input: $input){ //input: variable에 적어놓은 input을 넣음. input있는 페이지에 적어놓은 함수이름넣는거같은데  
      반환값
    }
}


// type Mutation {
//  createAccount(input: CreateAccountAdoptUserInput!): CreateAccountOutput!
// }

//mutation Type: 데이터를 쓰는 호출 방법. query는 데이터를 가져와서 읽는 타입
/*CreateAccount이라는 mutation type을 만듦
  파라미터로 들어가는 값은 CreateAccountAdoptUserInput타입의 input(아래 참고)
  결과는 CreateAccountOutput으로 온다(아래 참고)
*/

//이걸 입력하면
// input CreateAccountAdopteeUserInput {
//   nickname: String!
//   email: String!
//   password: String!
// }

//이걸 생성해줌
// type CreateAccountOutput {
//   error: JSONObject
//   data: String
// }

// 이게 저장됨
// type AdopteeUser {
//   user: User!
//   nickname: String!
//   isAuthenticated: Boolean!
//   authenticatedAt: DateTime!
// }
