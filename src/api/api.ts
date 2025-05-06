import { ApolloClient, InMemoryCache } from '@apollo/client';

const clientURL = import.meta.env.VITE_API_URL;
console.log('clientURL', clientURL);
const client = new ApolloClient({
  uri: clientURL,
  cache: new InMemoryCache(),
});

export default client;
