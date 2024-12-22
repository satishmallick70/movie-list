const Movie = require('../model/model.jsx');

const resolvers = {
  movies: (args) => {
    const filter = {};

    // If a search term is provided, filter movies by name
    if (args.searchTerm) {
      filter.name = { $regex: args.searchTerm, $options: 'i' };  // Case-insensitive search
    }

    return Movie.find(filter);  // Return movies based on the filter
  },
  movieByName: (args) => {
    return Movie.findOne({ name: args.name });
  },
  addMovie: async (args) => {
    const movie = new Movie({
      name: args.name,
      genre: args.genre,
      year: args.year,
      image: args.image,
      isFavorite: false,
    });
    
    try {
      await movie.save();  // Wait for the movie to be saved
      return movie;
    } catch (err) {
      console.error('Error saving movie:', err);
      throw new Error('Error saving movie');
    }
  },
  toggleFavorite: (args) => {
    return Movie.findByIdAndUpdate(
      args.movieId,
      { $set: { isFavorite: args.isFavorite } },
      { new: true }
    );
  },
};

module.exports = resolvers;
