import { useEffect, useState } from "react";
import { MovieCard } from './MovieCard';
import { api } from '../services/api';
import '../styles/content.scss';

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface ContentProps {
  idSelected: number;
  isSelectedGenre: {
    id: number;
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    title: string;
  }
}

export function Content( { idSelected, isSelectedGenre }: ContentProps) {

  const [movies, setMovies] = useState<MovieProps[]>([]);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${idSelected}`).then(response => {
      setMovies(response.data);
    });
  }, [idSelected]);

  return (

    <div className="container">
      <header>
        <span className="category">Categoria:<span> {isSelectedGenre.title}</span></span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard key ={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>

  )
}