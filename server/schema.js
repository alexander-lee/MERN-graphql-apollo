import { makeExecutableSchema } from 'graphql-tools';

import typeDefs from './models';
import resolvers from './resolvers';

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
