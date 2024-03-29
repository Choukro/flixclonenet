import useFavorites from "../../hooks/useFavorites";
import { useCallback, useMemo } from "react";
import { PlusCircle } from "lucide-react";
import { CheckCircle2 } from "lucide-react";
import { Plus } from "lucide-react";
import { Check } from "lucide-react";
import { TYPE_MOVIE } from "../../_utils/constants";
import { Tooltip } from 'react-tooltip'

const BookmarkButton = ({ movieId, type, row = false }) => {
  const { data, mutate: mutateFavorites } = useFavorites();

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

    mutateFavorites();
  }, [movieId, isFavorite, type, mutateFavorites]);
  let Icon;
  if (row) {
    Icon = isFavorite ? Check : Plus;
  } else {
    Icon = isFavorite ? CheckCircle2 : PlusCircle;
  }

  return (
    <>
      <a 
      className="card__tooltip"
        data-tooltip-id="my-tooltip"
        data-tooltip-content={isFavorite ? "Supprimer de ma liste" : "Ajouter à ma liste"}
        data-tooltip-place="top"
      >
        <Icon
          className={row ? "card__icon--small card__icon--lucide" : ""}
          onClick={toggleFavorites}
        />
      </a>
      <Tooltip id="my-tooltip" />
    </>
  );
};

export { BookmarkButton };
