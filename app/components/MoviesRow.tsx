'use client'

import MovieCard from './MovieCard'

const movies = [
  {
    title: 'Stranger Things',
    imageUrl: 'https://image.tmdb.org/t/p/original/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg',
    description: 'Supernatural adventure in Hawkins, Indiana.',
  },
  {
    title: 'The Witcher',
    imageUrl: 'https://image.tmdb.org/t/p/original/zrPpUlehQaBf8YX2NrVrKK8IEpf.jpg',
    description: 'Monster hunter Geralt of Rivia battles deadly creatures.',
  },
  {
    title: 'Money Heist',
    imageUrl: 'https://image.tmdb.org/t/p/original/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg',
    description: 'A criminal mastermind plans the biggest heist in history.',
  },
]

export default function MoviesRow() {
  return (
    <div className="flex overflow-x-auto scrollbar-hide p-5">
      {movies.map((movie, index) => (
        <MovieCard key={index} {...movie} />
      ))}
    </div>
  )
}
