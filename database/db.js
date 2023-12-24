/* fichier simulant un backend qui stock des données
  ici nous sauvegarderons les données dans le localStorage
*/

/**  Bookmark **/
import { TYPE_TV, TYPE_MOVIE } from "../_utils/constants.js";

const localStorageKeyList = "db-flixclonenet-users-savedlist";

function loadAllUsersBookmarks() {
  const all = JSON.parse(window.localStorage.getItem(localStorageKeyList));
  return all ?? [];
}

async function saveUserBookmark(savedList) {
  let all = loadAllUsersBookmarks();
  all = all.filter((item) => item.uid !== savedList.uid);
  all.push(savedList);

  saveAllUsersBookmarks(all);
}

function saveAllUsersBookmarks(allUidList) {
  window.localStorage.setItem(localStorageKeyList, JSON.stringify(allUidList));
}
async function loadBookmarkByUid(uid) {
  //bookmark example => {uid: 1, movies: [1010, 1010, 5050],series:[6515,541]}
  const bookmark = loadAllUsersBookmarks().find((item) => item.uid === uid);
  return bookmark ?? { uid, movies: [], series: [] };
}

async function addMovieToBookmark(movieId, uid) {
  await addToBookmark(movieId, uid, TYPE_MOVIE);
}

async function addSerieToBookmark(tvId, uid) {
  await addToBookmark(tvId, uid, TYPE_TV);
}
async function addToBookmark(ui, uid, type = TYPE_TV) {
  const bookmark = await loadBookmarkByUid(uid);
  await checkBookMark(ui, uid, type);
  if (type === TYPE_TV) {
    bookmark.series.push(ui);
  } else {
    bookmark.movies.push(ui);
  }
  saveUserBookmark(bookmark);
}

async function deleteMovieToBookmark(movieId, uid) {
  await deleteToBookmark(movieId, uid, TYPE_MOVIE);
}
async function deleteSerieToBookmark(tvId, uid) {
  await deleteToBookmark(tvId, uid, TYPE_TV);
}

async function deleteToBookmark(id, uid, type = TYPE_TV) {
  const bookmark = await loadBookmarkByUid(uid);
  if (type === TYPE_TV) {
    const series = bookmark.series.filter((item) => item !== id);
    bookmark.series = series;
  } else {
    const movies = bookmark.movies.filter((item) => item !== id);
    bookmark.movies = movies;
  }
  saveUserBookmark(bookmark);
}

async function checkBookMark(id, uid, type = TYPE_TV) {
  const bookmark = await loadBookmarkByUid(uid);
  if (type === TYPE_TV) {
    const serie = bookmark.series.find((item) => item === id);
    if (serie > 0) {
      const error = new Error("Serie déjà dans la liste");
      error.status = 400;
      throw error;
    }
  } else {
    const movie = bookmark.movies.find((item) => item === id);
    if (movie) {
      const error = new Error("Film déjà dans la liste");
      error.status = 400;
      throw error;
    }
  }
}

export {
  addMovieToBookmark,
  addSerieToBookmark,
  loadBookmarkByUid,
  deleteMovieToBookmark,
  deleteSerieToBookmark,
};
