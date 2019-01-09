import axios from "axios";
import { IMovie } from "./types";

const API_KEY = "aeca12c4c31a9c2908e1b9dd78a645f5";

const BASE_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&`;

export const getMovies = async (query: string) => {
  try {
    const res = await axios.get<IMovie[]>(
      `${BASE_URL}query=${query}&language=pt-BR`
    );
    const movies = res.data;
    return movies;
  } catch (err) {
    throw new Error("Não foi possível pegar lista de filmes");
  }
};
