import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql", // Ensure this matches your server's URL
  cache: new InMemoryCache(),
});

export default client;
