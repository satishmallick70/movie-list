import React from 'react';
import Movie from '../components/movie'; // Import the Movie component
import { useQuery, useMutation, gql } from '@apollo/client';

// Define the GraphQL query to fetch all movies
const ALL_MOVIES = gql`
  {
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

const FavoritesPage = () => {
  const { loading, error, data, refetch } = useQuery(ALL_MOVIES);

  const [toggleFavorite] = useMutation(TOGGLE_FAVORITE, {
    // Refetch movies after updating the favorite status
    refetchQueries: [{ query: ALL_MOVIES }],
    // Alternatively, you can use optimistic response for faster UI updates
  });

  const handleFavoriteToggle = (movieId, currentStatus) => {
    toggleFavorite({
      variables: {
        movieId,
        isFavorite: !currentStatus,  // Toggle the current status
      },
    }).then(response => {
      console.log('Movie favorite status updated:', response.data.toggleFavorite);
    }).catch(error => {
      console.error('Error toggling favorite:', error);
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Filter the movies to only show favorites
  const favoriteMovies = data?.movies.filter(movie => movie.isFavorite);

  return (
    <div className="movies">
      <h1>My Favorite Movies</h1>
      {favoriteMovies.length === 0 ? (
        <p>No favorite movies added yet.</p>
      ) : (
        favoriteMovies.map((movie) => (
          <Movie
            key={movie._id}  // Use _id as key to ensure uniqueness
            name={movie.name}
            genre={movie.genre}
            year={movie.year}
            image={movie.image}
            isFavorite={movie.isFavorite}
            onToggleFavorite={() => handleFavoriteToggle(movie._id, movie.isFavorite)} 
          />
        ))
      )}
    </div>
  );
};

export default FavoritesPage;
