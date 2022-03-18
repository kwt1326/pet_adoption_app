import React, { useCallback, useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { useIntersection } from '../../hooks/useIntersection';
import AgencyList from "../../components/Agencylist";
import Header from "../../components/Header/index";

const GET_ADOPT_USERS_QUERY = gql`
  query getAuthenticatedAdoptUsers($input: GetAdoptUsersArgs!) {
    getAuthenticatedAdoptUsers(getAdoptUsersArgs: $input) {
      id
      user {
        email
      }
      companyName
    }
  }
`;

function authAgency() {
  const [page, setPage] = useState(1);
  const [, setObserverRef] = useIntersection((_entry, _observer) => loadMore());

  const getListInputData = useCallback(() => ({
    variables: {
      input: { page },
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

  if (AuthenticatedAdoptUsers) {
    return (
      <div>
        <Header children="인증업체 리스트" />
        <AgencyList list={AuthenticatedAdoptUsers} />
        <div ref={setObserverRef} style={{ width: '100%', height: 10 }} />
      </div>
    );
  }
}

export default authAgency;
