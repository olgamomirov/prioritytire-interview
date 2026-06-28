import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  link: new HttpLink({ uri: "https://backend.reachdigital.dev/graphql" }),
  cache: new InMemoryCache({ resultCaching: false }),
  ssrMode: true,
  defaultOptions: {
    query: {
      fetchPolicy: "no-cache",
    },
  },
});
