import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Movie from './movie/Movie';

const API_KEY = 'c45a857c193f6302f2b5061c3b85e743';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      let url = '';
      switch (category) {
        case 'upcoming':
          url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`;
          break;
        case 'top_rated':
          url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
          break;
        case 'search':
          url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchQuery}&page=1`;
          break;
        default:
          url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
      }

      try {
        const response = await axios.get(url);
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    if (category === 'search' && searchQuery === '') return;
    fetchMovies();
  }, [category, searchQuery]);

  return (
    <div className="Home">
      <div className='links'>
        <button onClick={() => setCategory('popular')}>Popular</button>
        <button onClick={() => setCategory('top_rated')}>Top Rated</button>
        <button onClick={() => setCategory('upcoming')}>Upcoming</button>
        <input 
          type='text' 
          placeholder='Movie Name' 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={() => setCategory('search')}>Search</button>
      </div>
      <div className="movie-list">
        {movies.map(movie => (
          <Link key={movie.id} to={`/movie/${movie.id}`}>
            <Movie
              image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              title={movie.title}
              rating={movie.vote_average}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
