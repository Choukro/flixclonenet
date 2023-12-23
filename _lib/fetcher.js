import axios from "axios";

const fetcher = (url) =>
  axios
    .get(url)
    .then((res) => res.data)
    .catch((error) => {
      console.error("Erreur lors de la récupération des données :", error);
      // Vous pouvez choisir de renvoyer une erreur, ce qui rejettera la promesse
      // ou de renvoyer une valeur par défaut pour éviter que l'erreur ne se propage
      throw error;
    });

export default fetcher;
