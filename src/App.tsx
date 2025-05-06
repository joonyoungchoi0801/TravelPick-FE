import Router from './Router';
import './App.css';
import { ApolloProvider } from '@apollo/client';
import client from './api/api';

function App() {
  return (
    <ApolloProvider client={client}>
      <Router />
    </ApolloProvider>
  );
}

export default App;
