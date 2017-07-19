import { ApolloClient, createNetworkInterface } from 'react-apollo';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: '/graphql'
  })
  .use([{
    applyMiddleware(req, next) {
      setTimeout(next, 500); // TODO: FOR LATENCY TESTING, REMOVE
    }
  }]),
  dataIdFromObject: object => `${object.__typename}_${object.id}`,
  connectToDevTools: process.env.NODE_ENV !== 'production'
});


export default client;
