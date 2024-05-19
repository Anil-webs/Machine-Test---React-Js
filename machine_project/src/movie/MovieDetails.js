import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './movieDetails.css';

const API_KEY = 'c45a857c193f6302f2b5061c3b85e743';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`);
        setMovie(movieResponse.data);

        const castResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`);
        setCast(castResponse.data.cast);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="movie-details">
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>
      <h3>Cast</h3>
      <ul className="cast-list">
        {cast.map(member => (
          <li key={member.cast_id} className="cast-member">
            <img 
              src={`https://image.tmdb.org/t/p/w200${member.profile_path}`} 
              alt={member.name} 
              className="cast-member__image" 
            />
            <div className="cast-member__info">
              <p>{member.name} as {member.character}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieDetails;
