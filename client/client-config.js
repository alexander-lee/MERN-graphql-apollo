import { ApolloClient, createNetworkInterface } from 'react-apollo';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: '/graphql'
  })
});

export default client;
