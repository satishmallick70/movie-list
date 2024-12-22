import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

// GraphQL query to fetch all movies
const GET_MOVIES = gql`
  query GetMovies {
    movies {
      _id
      name
      genre
      year
      image
      isFavorite
    }
  }
`;

// Mutation to toggle favorite status
const TOGGLE_FAVORITE = gql`
  mutation ToggleFavorite($movieId: ID!, $isFavorite: Boolean!) {
    toggleFavorite(movieId: $movieId, isFavorite: $isFavorite) {
      _id
      name
      genre
      year
      image
      isFavorite
    }
  }
`;

const Movies = () => {
  // Fetch movies using the GET_MOVIES query
  const { data, loading, error } = useQuery(GET_MOVIES);

  // Use the mutation to toggle the favorite status
  const [toggleFavorite] = useMutation(TOGGLE_FAVORITE, {
    // Refetch the movies list after a mutation
    refetchQueries: [{ query: GET_MOVIES }],
  });

  // Handle the favorite toggle logic
  const handleFavoriteToggle = (movieId, currentStatus) => {
    toggleFavorite({
      variables: {
        movieId,
        isFavorite: !currentStatus, // Toggle the favorite status
      },
    }).then((response) => {
      console.log('Favorite status updated:', response.data.toggleFavorite);
    }).catch((error) => {
      console.error('Error toggling favorite:', error);
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="movies">
      {data?.movies?.map((movie) => (
        <div key={movie._id} className="movie">
          <img src={movie.image} alt={movie.name} />
          <h3>{movie.name}</h3>
          <p>{movie.genre} ({movie.year})</p>
          <button 
            onClick={() => handleFavoriteToggle(movie._id, movie.isFavorite)}
            style={{ backgroundColor: movie.isFavorite ? 'gold' : 'gray' }}
          >
            {movie.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Movies;
