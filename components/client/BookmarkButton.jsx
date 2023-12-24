// import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "../../hooks/useFavorites";
import { useCallback, useMemo } from "react";
import { PlusCircle } from "lucide-react";
import { CheckCircle2 } from "lucide-react";
import { Plus } from "lucide-react";
import { Check } from "lucide-react";
import { TYPE_MOVIE } from "../../_utils/constants";

const BookmarkButton = ({ movieId, type, row = false }) => {
  const { data, mutate: mutateFavorites } = useFavorites();
  //   const { data: currentUser, mutate } = useCurrentUser();

  const isFavorite = useMemo(() => {
    const list = data?.[type === TYPE_MOVIE ? "movies" : "series"] || [];
    return list.includes(String(movieId));
  }, [data, type, movieId]);

  const toggleFavorites = useCallback(async () => {
    let response;

    if (isFavorite) {
      response = await fetch("/api/bookmark/selection", {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ movieId: movieId, type: type }),
      });
    } else {
      response = await fetch("/api/bookmark/selection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ movieId: movieId, type: type }),
      });
    }

    // const updatedFavoriteIds = response?.data?.favoriteIds;

    // mutate({
    //   ...currentUser,
    //   favoriteIds: updatedFavoriteIds,
    // });
    mutateFavorites();
  }, [movieId, isFavorite, type, mutateFavorites]);
  let Icon;
  if (row) {
    Icon = isFavorite ? Check : Plus;
  } else {
    Icon = isFavorite ? CheckCircle2 : PlusCircle;
  }

  return (
    <Icon
      className={row ? "card__icon--small card__icon--lucide" : ""}
      onClick={toggleFavorites}
    />
  );
};

export { BookmarkButton };
