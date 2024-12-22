const { buildSchema } = require('graphql');
const movieSchema=buildSchema(`
type Query{
  movies: [Movie] 
  movieByName(name:String!): Movie
}
type Mutation{
  addMovie(name: String!, genre: String!, year: String!, image: String!): Movie
  toggleFavorite(movieId: ID!, isFavorite: Boolean!): Movie
}
type Movie{
  _id: ID!
  name: String
  genre: String
  year: String
  image: String
  isFavorite: Boolean
}
`)
module.exports = movieSchema