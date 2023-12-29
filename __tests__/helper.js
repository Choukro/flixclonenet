import {
  getRandomIntInclusive,
  getRandomType,
  getRandomMovie,
  getRandomSerie,
  getRandomId,
} from "../_utils/helper";
import { TYPE_TV, TYPE_MOVIE } from "../_utils/constants";

test("Retourne une nombre entier alétoire", () => {
  const min = 0;
  const max = 10;
  expect(getRandomIntInclusive(min, max)).toBeGreaterThanOrEqual(min);
  expect(getRandomIntInclusive(min, max)).toBeLessThanOrEqual(max);
});

test("Retourne un type aléatoire", () => {
  const types = [TYPE_TV, TYPE_MOVIE];
  expect(types).toContain(getRandomType());
});

test("Retourne un film aléatoire", () => {
  const moviesIds = [399566, 602734, 579047, 385128, 615658];
  expect(moviesIds).toContain(getRandomMovie());
});

test("Retourne une série aléatoire", () => {
  const tvIds = [71446, 60574, 1399, 66732];
  expect(tvIds).toContain(getRandomSerie());
});

test("Retourne une série ou un film aléatoire", () => {
  const moviesIds = [399566, 602734, 579047, 385128, 615658];
  const tvIds = [71446, 60574, 1399, 66732];
  expect(tvIds).toContain(getRandomId(TYPE_TV));
  expect(moviesIds).toContain(getRandomId(TYPE_MOVIE));
});
