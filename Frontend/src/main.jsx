import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './App.css';
import App from './App.jsx';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { BrowserRouter as Router } from 'react-router-dom';

// Create Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

// Render the root component
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
  </StrictMode>
);
