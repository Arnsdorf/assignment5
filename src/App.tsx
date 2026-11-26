import { useEffect, useRef, useState } from 'react'
import { searchPeople, type PersonSearchResult } from './api/people'
import Person from './Person'

const QUERY = 'spielberg'

export default function App() {
  const search = useRef<ReturnType<typeof searchPeople> | null>(null) // gemmer kaldet
  const [people, setPeople] = useState<PersonSearchResult[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const request = (search.current ??= searchPeople(QUERY))
    request.then(
      ({ results }) => {
        console.log(results) // se hvad vi får tilbage
        setPeople(results)
        setLoading(false)
      },
      (error) => {
        console.error(error)
        setError(true)
        setLoading(false)
      },
    )
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Could not load people.</p>
  if (people.length === 0) return <p>No people found.</p>

  return (
    <main>
      {people.map((person) => <Person key={person.id} person={person} />)}
    </main>
  )
}
