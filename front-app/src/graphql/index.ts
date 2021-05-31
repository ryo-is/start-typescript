import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  gql,
} from '@apollo/client/core';
import { Query } from '@/graphql/generated/graphql';

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
});
const cache = new InMemoryCache();
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

export const hello = async (): Promise<string> => {
  const res = await apolloClient.query<Query>({
    query: gql`
      query {
        hello
      }
    `,
  });
  console.log('graphql res', res.data.hello);
  return res.data.hello || '';
};
