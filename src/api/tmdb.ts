export interface TmdbPage<Result> {
  page: number
  results: Result[]
  total_pages: number
  total_results: number
}

export async function fetchTmdb<Result>(
  path: string,
  params: Record<string, string> = {},
): Promise<Result> {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY?.trim()
  if (!apiKey) {
    throw new Error('Set VITE_TMDB_API_KEY in .env.local to use TMDB.')
  }

  const url = new URL(`https://api.themoviedb.org/3/${path}`)
  url.search = new URLSearchParams({ ...params, api_key: apiKey }).toString()

  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`TMDB request for ${path} failed (HTTP ${response.status}).`)
  }

  return response.json() as Promise<Result>
}
