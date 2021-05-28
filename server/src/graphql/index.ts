import fs from 'fs';
import { Express } from 'express';
import { makeExecutableSchema } from 'graphql-tools';
import { graphqlHTTP } from 'express-graphql';
import { resolvers } from 'src/graphql/resolvers';
import { ApolloServer, gql } from 'apollo-server-express';

// express-graphql
export const createGraphqlHTTP = () => {
  const typeDefs = fs.readFileSync('src/graphql/schema.graphql', {
    encoding: 'utf8',
  });
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });
  return graphqlHTTP({ schema, graphiql: true });
};

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
