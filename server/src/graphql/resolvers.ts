import { Resolvers } from 'src/graphql/generated/graphql';
import { DBAccessor } from 'src/dbAccessor';

const dbAccessor = new DBAccessor();

export const resolvers: Resolvers = {
  Query: {
    hello: async () => {
      console.log(dbAccessor);
      return 'hello GraphGL !!!!';
    },
  },
};
