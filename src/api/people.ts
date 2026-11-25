import { fetchTmdb, type TmdbPage } from './tmdb'

interface KnownForEntry {
  id: number
  overview: string
}

export type KnownForTitle = KnownForEntry & (
  | { media_type: 'movie'; title: string; release_date: string }
  | { media_type: 'tv'; name: string; first_air_date: string }
)

export interface PersonSearchResult {
  id: number
  name: string
  known_for_department: string
  known_for: KnownForTitle[]
}

export function searchPeople(query: string, page = 1) {
  return fetchTmdb<TmdbPage<PersonSearchResult>>('search/person', {
    query: query.trim(),
    page: String(page),
  })
}

export function fetchPersonImages(id: number) {
  return fetchTmdb<{ profiles: { file_path: string }[] }>(`person/${id}/images`)
}
