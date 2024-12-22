import React from 'react';

export default function Movie(props) {
  return (
    <div className="card">
      <div className="container">
        {/* Ensure that the image URL is correct */}
        <img
          src={props.image}
          alt="movie poster"
          onError={(e) => e.target.src = 'defaultImage.jpg'} // Optional: handle broken images
        />
        <h2>{props.name}</h2>
        <h3>{props.genre} - {props.year}</h3>
        {/* Button to toggle the favorite status */}
        <button onClick={props.onToggleFavorite}>
          {props.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
      </div>
    </div>
  );
}