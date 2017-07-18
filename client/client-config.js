import { ApolloClient, createNetworkInterface } from 'react-apollo';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: '/graphql'
  }),
  connectToDevTools: process.env.NODE_ENV !== 'production'
});


export default client;
