import type { KnownForTitle } from './api/people'

export default function KnownFor({ movie }: { movie: KnownForTitle }) {
  if (movie.media_type !== 'movie') return null

  return (
    <section className="movie">
      <h3>{movie.title}</h3>
      <p>{movie.release_date}</p>
      <p>{movie.overview}</p>
    </section>
  )
}
