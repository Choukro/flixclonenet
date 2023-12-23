import prisma from "../../../_lib/prisma";
import serverAuth from "../../../_lib/serverAuth";
import { NextResponse } from "next/server";

export async function GET() {
  const { currentUser } = await serverAuth();
  if (!currentUser) {
    return NextResponse("Utilisateur non authentifié !", { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: currentUser.id,
    },
  });
  const favoriteMovies = {
    movies: user.favoriteIdsMovies,
    series: user.favoriteIdsSeries,
  };

  // in: currentUser?.favoriteIdsSeries,

  if (!favoriteMovies) {
    return NextResponse("Aucun film favori !", { status: 404 });
  }
  console.log("Favori :", favoriteMovies);
  return NextResponse.json(favoriteMovies);
}
