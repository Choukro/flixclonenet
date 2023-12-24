import { TYPE_TV, TYPE_MOVIE } from "./constants.js";

/**
 * Permet d'obtenir un nombre entier aléatoire sur une plage
 *
 * @param   {number}  entier min / max
 * @returns {number}  nombre entier aléatoire
 */
export function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Permet d'obtenir un nombre entier aléatoire sur une plage
 *
 * @param   {number}  entier min / max
 * @returns {number}  nombre entier aléatoire
 */
export function getRandomType() {
  return [TYPE_TV, TYPE_MOVIE][getRandomIntInclusive(0, 1)];
}

/**
 * Permet d'obtenir un id d'un film aléatoire
 *
 * @param void
 * @returns {number}  id d'un film aléatoire
 */
export function getRandomMovie() {
  const moviesIds = [399566, 602734, 579047, 385128, 615658];
  return moviesIds[getRandomIntInclusive(0, moviesIds.length - 1)];
}

/**
 * Permet d'obtenir un id d'une série aléatoire
 *
 * @param void
 * @returns {number}  id d'une série aléatoire
 */
export function getRandomSerie() {
  const tvIds = [71446, 60574, 1399, 66732];
  return tvIds[getRandomIntInclusive(0, tvIds.length - 1)];
}

/**
 * Permet d'obtenir un id aléatoire d'un film ou d'une série
 *
 * @param  {string}  type  type de contenu (movie / tv)
 * @returns  id aléatoire d'un film ou d'une série
 */
export function getRandomId(type = TYPE_MOVIE) {
  return type === TYPE_TV ? getRandomSerie() : getRandomMovie();
}
