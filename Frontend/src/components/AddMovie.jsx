import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

// GraphQL Mutation
const ADD_MOVIE = gql`
  mutation AddMovie($name: String!, $genre: String!, $year: String!) {
    addMovie(name: $name, genre: $genre, year: $year) {
      name
      genre
      year
    }
  }
`;

const AddMovie = () => {
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');

  // Hook for mutation
  const [addMovie, { loading, error }] = useMutation(ADD_MOVIE);

  const handleSubmit = (e) => {
    e.preventDefault();

    addMovie({
      variables: { name, genre, year },
    })
      .then((response) => {
        console.log('Movie added:', response.data.addMovie);
        setName('');
        setGenre('');
        setYear('');
      })
      .catch((err) => {
        console.error('Error adding movie:', err);
      });
  };

  return (
    <div className="addMovie" id="form">
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Genre</label>
        <input
          type="text"
          required
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <label>Year</label>
        <input
          type="text"
          placeholder="(optional)"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Movie'}
        </button>
      </form>
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default AddMovie;
