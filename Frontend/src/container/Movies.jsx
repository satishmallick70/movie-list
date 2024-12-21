import React, { useState, useEffect } from 'react';  // Changed to functional component
import Movie from '../components/movie';
import { useQuery, gql } from '@apollo/client';

// Define the GraphQL query
const ALL_MOVIES = gql`
  {
    movies {
      name
      genre
      year
    }
  }
`;

const Movies = () => {
  const { loading, error, data } = useQuery(ALL_MOVIES);
  
  // State to store movies in case you need to manipulate them


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="movies">
      {data?.movies.map((movie) => (
        <Movie
          key={movie.name}
          name={movie.name}
          genre={movie.genre}
          year={movie.year}
        />
      ))}
    </div>
  );
};

export default Movies;
