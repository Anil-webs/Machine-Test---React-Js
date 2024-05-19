import React from 'react';
import PropTypes from 'prop-types';

const Movie = ({ image, title, rating }) => {
    return (
        <div className="movie-card">
            <img src={image} alt={title} className="movie-card__image" />
            <div className="movie-card__details">
                <h2 className="movie-card__title">{title}</h2>
                <p className="movie-card__rating">Rating: {rating}</p>
            </div>
        </div>
    );
};

Movie.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
};


export default Movie;