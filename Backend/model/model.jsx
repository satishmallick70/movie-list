const mongoose= require('mongoose')

const movieSchema=new mongoose.Schema({
  name: String,
  genre: String,
  year: String,
  image: String,
  isFavorite: { type: Boolean, default: false }
})
module.exports = new mongoose.model('Movie', movieSchema)