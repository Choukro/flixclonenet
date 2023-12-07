/**
 * NetflixApp.jsx
 *
 * @param
 * @returns
 */
"use client";

import { NetflixAppBar } from "./NetflixAppBar.jsx";
import { useRouter } from "next/navigation";

function ErrorFallback({ error, resetErrorBoundary }) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
    resetErrorBoundary();
  };
  return (
    <div>
      <NetflixAppBar />
      <div
        role="alert"
        style={{
          height: "100%",
          textAlign: "center",
          margin: "100px 300px",
          color: "#fff",
        }}
      >
        <h1 style={{ fontSize: "2.5em", marginTop: "15rem" }}>
          Vous cherchez votre chemin ?
        </h1>
        <pre style={{ color: "red", fontSize: "1em" }}>
          Erreur : {error.message}
        </pre>

        <div
          className="banner__buttons"
          style={{ justifyContent: "center", marginTop: "5rem" }}
        >
          <button
            className="banner__button banner__buttonplay"
            onClick={handleClick}
          >
            Accueil
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorFallback;
