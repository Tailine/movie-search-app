export interface IMovie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  overview: string;
  genre: number[];
  vote_average: number;
}

export interface IPayloadGetMany<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface IMovieDetails {
  budget: number;
  original_language: string;
  overview: string;
  status: string;
  title: string;
}
