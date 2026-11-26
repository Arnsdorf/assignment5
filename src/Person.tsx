import type { PersonSearchResult } from './api/people'

export default function Person({ person }: { person: PersonSearchResult }) {
  return <div><h2>{person.name}</h2><p>{person.known_for_department}</p></div>
}
