const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql'); // Import express-graphql
const movieSchema = require('./schema/schema.jsx');
const resolvers = require('./resolver/resolver.jsx');
const cors = require('cors')

// MongoDB connection
mongoose.connect('mongodb+srv://satishkumar19575:Gomul%40123@cluster0.jl0pc.mongodb.net/?retryWrites=true&w=majority', {})
  .then(() => console.log('MongoDB connected!'))
  .catch((err) => console.log('Error:', err));




app.use(cors())
// GraphQL setup with GraphiQL
app.use('/graphql', graphqlHTTP({
  schema: movieSchema,
  rootValue: resolvers,
  graphiql: true, // Enables GraphiQL
}));

// REST endpoint
app.get('/', (req, res) => {
  res.send('Hello from backend app.js');
});

// Start the server
app.listen(4000, () => {
  console.log('Server on port 4000');
});
