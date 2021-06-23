import { Resolvers } from 'src/graphql/generated/graphql';
import { DBAccessor } from 'src/dbAccessor';

const dbAccessor = new DBAccessor();

export const resolvers: Resolvers = {
  Query: {
    hello: async () => {
      console.log(dbAccessor);
      return {
        res: {
          text: 'hello GraphGL !!!!',
          number: 12345,
        },
      };
    },
  },
  Hello: {
    func: (p, a, c, i) => {
      console.log('----- parent -----', p);
      console.log('----- args -----', a);
      console.log('----- context -----', c);
      console.log('----- info -----', i);
      return 'funcdayo' + a.t;
    },
  },
};
