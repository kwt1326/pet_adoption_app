import React from "react";
import AgencyList from "../../components/Agencylist";
import Header from "../../components/Header/index";
import { useQuery, gql } from "@apollo/client";
// const agencylist = [
//   {
//     name: "땡땡 업체",
//     forSale: 12,
//     saleComplete: 2,
//   },
//   {
//     name: "땡땡 업체",
//     forSale: 12,
//     saleComplete: 2,
//   },
//   {
//     name: "땡땡 업체",
//     forSale: 12,
//     saleComplete: 2,
//   },
//   {
//     name: "땡땡 업체",
//     forSale: 12,
//     saleComplete: 2,
//   },
//   {
//     name: "땡땡 업체",
//     forSale: 12,
//     saleComplete: 2,
//   },
//   {
//     name: "땡땡 업체",
//     forSale: 12,
//     saleComplete: 2,
//   },
//   {
//     name: "땡땡 업체",
//     forSale: 12,
//     saleComplete: 2,
//   },
// ];

function authAgency(props) {
  const GET_ADOPT_USERS_QUERY = gql`
    query getAuthenticatedAdoptUsers($getAdoptUsersArgs: GetAdoptUsersArgs!) {
      getAuthenticatedAdoptUsers(getAdoptUsersArgs: $getAdoptUsersArgs) {
        user {
          email
        }
        companyName
      }
    }
  `;
  const { data } = useQuery(GET_ADOPT_USERS_QUERY, {
    variables: {
      getAdoptUsersArgs: { page: 1 },
    },
  });
  const AuthenticatedAdoptUsers = data?.getAuthenticatedAdoptUsers || [];
  return (
    <div>
      <Header children="인증업체 리스트" />
      <AgencyList list={AuthenticatedAdoptUsers}></AgencyList>
    </div>
  );
}

export default authAgency;
