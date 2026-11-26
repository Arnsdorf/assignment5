import { useEffect, useRef } from 'react'
import { searchPeople } from './api/people'

const QUERY = 'spielberg'

export default function App() {
  const search = useRef<ReturnType<typeof searchPeople> | null>(null)

  useEffect(() => {
    const request = (search.current ??= searchPeople(QUERY))
    request.then(
      ({ results }) => console.log(results),
      (error) => console.error(error),
    )
  }, [])

  return null
}
