import type { PersonSearchResult } from './api/people'
import KnownFor from './KnownFor'

export default function Person({ person }: { person: PersonSearchResult }) {
  return (
    <div>
      <h2>{person.name}</h2>
      <p>{person.known_for_department}</p>
      {person.known_for.filter((entry) => entry.media_type === 'movie').map((movie) => (
        <KnownFor key={movie.id} movie={movie} />
      ))}
    </div>
  )
}
