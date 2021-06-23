import fs from 'fs';
import { Express } from 'express';
import {} from 'graphql-tools';
import { resolvers } from 'src/graphql/resolvers';
import { ApolloServer, gql } from 'apollo-server-express';

// Apollo
export const startApolloServer = async (app: Express) => {
  const typeDefs = gql(
    fs.readFileSync('src/graphql/schema.graphql', {
      encoding: 'utf8',
    })
  );
  const gqlSrever = new ApolloServer({ typeDefs, resolvers });
  await gqlSrever.start();
  gqlSrever.applyMiddleware({ app });
};
