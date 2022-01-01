import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: process.env.NODE_ENV === "production" ? "" : "http://localhost:8090",
    cache: new InMemoryCache(),
});

export default client;