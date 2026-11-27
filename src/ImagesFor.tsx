import { useEffect, useState } from 'react'
import { fetchPersonImages } from './api/people'

export default function ImagesFor({ id }: { id: number }) {
  const [images, setImages] = useState<string[]>([])

  useEffect(() => {
    let active = true
    fetchPersonImages(id).then(
      ({ profiles }) => {
        if (active) setImages(profiles.map((profile) => profile.file_path))
      },
      (error) => console.error(error),
    )
    return () => { active = false }
  }, [id])

  return (
    <section className="images">
      {images.map((path, index) => (
        <img key={`${path}-${index}`} src={`https://image.tmdb.org/t/p/w45${path}`} alt="Person" />
      ))}
    </section>
  )
}
