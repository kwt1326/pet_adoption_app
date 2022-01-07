import { ApolloClient, createHttpLink, InMemoryCache, makeVar, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { setContext } from "@apollo/client/link/context";
// import { WebSocketLink } from "@apollo/client/link/ws";
import cookies from 'js-cookie';

const token = cookies.get(process.env.JWT_KEY)

export const isLoggedVar = makeVar(Boolean(token));
export const tokenVar = makeVar(token);

const uri = process.env.NODE_ENV === "production" ? "" : "http://localhost:8090/graphql";

const httpLink = createHttpLink({ uri });

// const wsLink = new WebSocketLink({
//   uri: 'ws://localhost:8090/subscriptions',
//   options: {
//     reconnect: true,
//     connectionParams: {
//       "x-jwt": tokenVar() || '',
//     },
//   }
// });

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    "x-jwt": tokenVar() || '',
  }
}))

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition"
      // && definition.operation === "subscription"
    );
  },
  // wsLink,
  authLink.concat(httpLink)
)

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            read() {
              return isLoggedVar();
            },
          },
          token: {
            read() {
              return tokenVar();
            },
          },
        },
      },
    },
  }),
});

export default client;