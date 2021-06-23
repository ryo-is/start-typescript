import { Resolvers } from 'src/graphql/generated/graphql';
import { DBAccessor } from 'src/dbAccessor';

const dbAccessor = new DBAccessor();

export const resolvers: Resolvers = {
  Query: {
    hello: async () => {
      console.log(dbAccessor);
      return {};
    },
    company: () => {
      return {};
    },
  },
  Hello: {
    res: () => {
      return {
        text: 'hello GraphGL !!!!',
        number: 12345,
      };
    },
    func: (p, a, c, i) => {
      console.log('----- parent -----', p);
      console.log('----- args -----', a);
      console.log('----- context -----', c);
      console.log('----- info -----', i);
      return 'funcdayo';
    },
  },
  Company: {
    department: () => {
      console.log('----- department -----');
      return [
        {
          name: '総務部',
          membersCount: 10,
        },
        {
          name: '人事部',
          membersCount: 5,
        },
      ];
    },
    info: () => {
      console.log('----- info -----');
      return {
        companyAge: 100,
      };
    },
  },
};
