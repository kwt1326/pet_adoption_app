import { ApolloClient, createHttpLink, InMemoryCache, makeVar, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { setContext } from "@apollo/client/link/context";
// import { WebSocketLink } from "@apollo/client/link/ws"; // IF USING WEB SOCKET
import Cookie from 'universal-cookie';

import { mergeList } from "../utils/mergeList";

const token = (new Cookie()).get(process.env.JWT_KEY)

export const isLoggedVar = makeVar(Boolean(token));
export const tokenVar = makeVar(token);

const userAgent = typeof navigator === 'undefined' ? 'noUserAgentSSR' : navigator.userAgent

const isAndroid = () => /Android/i.test(userAgent);
const isIOS = () => /iPhone|iPad|iPod/i.test(userAgent);
const isOpera = () => /Opera Mini/i.test(userAgent);
const isWindows = () => /IEMobile/i.test(userAgent);
const isSSR = () => /noUserAgentSSR/i.test(userAgent);
const isMobile = () => Boolean(isAndroid() || isIOS() || isOpera() || isWindows())
const isDesktop = () => Boolean(!isMobile() && !isSSR())

const localHost = 'localhost' // isMobile() ? /* my ip address */ '192.168.1.119' : 'localhost';

const uri = process.env.NODE_ENV === "production" ?
  'https://withpet-api.hminnn.xyz/graphql' :
  `http://${localHost}:8090/graphql`;

const httpLink = createHttpLink({ uri });

// IF USING WEB SOCKET
// const wsLink = new WebSocketLink({
//   uri: 'ws://localhost:8090/subscriptions',
//   options: {
//     reconnect: true,
//     connectionParams: {
//       "x-jwt": tokenVar() || '',
//     },
//   }
// });

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "x-jwt": tokenVar() || '',
    }
  }
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition"
      // && definition.operation === "subscription" // IF USING WEB SOCKET
    );
  },
  // wsLink, // IF USING WEB SOCKET
  authLink.concat(httpLink)
)

const client = new ApolloClient({
  ssrMode: true,
  link: splitLink,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network'
    }
  },
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
          getPosts: {
            keyArgs: false,
            read(existing) { return existing },
            merge(existing = [], incoming, { args: { getPostsArgs } }) {
              return mergeList(existing, incoming, getPostsArgs?.page);
            }
          },
          getAuthenticatedAdoptUsers: {
            keyArgs: false,
            read(existing) { return existing },
            merge(existing = [], incoming, { args: { getAdoptUsersArgs } }) {
              return mergeList(existing, incoming, getAdoptUsersArgs?.page);
            }
          },
          getAdoptReviews: {
            keyArgs: false,
            read(existing) { return existing },
            merge(existing = [], incoming, { args: { getAdoptReviewsArgs } }) {
              return mergeList(existing, incoming, getAdoptReviewsArgs?.page);
            }
          },
        },
      },
    },
  }),
});

export default client;