import React, { useCallback, useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { useIntersection } from '../../hooks/useIntersection';
import AgencyList from "../../components/Agencylist";
import Header from "../../components/Header/index";

function authAgency() {
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

  const [page, setPage] = useState(1);
  const [, setObserverRef] = useIntersection(async (_entry, _observer) => loadMore());

  const getListInputData = useCallback(() => ({
    variables: {
      getAdoptUsersArgs: { page },
    },
  }), [page])

  const { loading, data, fetchMore } = useQuery(GET_ADOPT_USERS_QUERY, getListInputData());

  const getListMore = async () => {
    const result = await fetchMore(getListInputData());
    if (result?.error) {
      console.error(result.error);
      alert(result.error.message);
    }
  };

  useEffect(() => {
    getListMore();
  }, [page]);

  const loadMore = useCallback(() => setPage(prevPage => prevPage + 1), []);

  const AuthenticatedAdoptUsers = data?.getAuthenticatedAdoptUsers || [];

  return (
    <div>
      <Header children="인증업체 리스트" />
      <AgencyList list={AuthenticatedAdoptUsers}></AgencyList>
      <div ref={setObserverRef} style={{ width: '100%', height: 10 }} />
    </div>
  );
}

export default authAgency;
