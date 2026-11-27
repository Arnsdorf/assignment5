import { useEffect, useRef, useState } from 'react'
import { searchPeople, type PersonSearchResult } from './api/people'
import Person from './Person'
import ImagesFor from './ImagesFor'

const QUERY = 'spielberg' // den søger vi på

export default function App() {
  const search = useRef<ReturnType<typeof searchPeople> | null>(null) // gemmer kaldet
  const [people, setPeople] = useState<PersonSearchResult[]>([])
  const [index, setIndex] = useState(0) // nummeret på personen
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
      <Person person={people[index]} />
      <ImagesFor key={people[index].id} id={people[index].id} />
      <button disabled={index === 0} onClick={() => setIndex(index - 1)}>
        Previous
      </button>
      <button disabled={index === people.length - 1} onClick={() => setIndex(index + 1)}>
        Next
      </button>
    </main>
  )
}
