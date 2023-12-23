import prisma from "../../../../_lib/prisma";
import serverAuth from "../../../../_lib/serverAuth";
import { NextResponse } from "next/server";
import { TYPE_MOVIE } from "../../../../_utils/constants";

export async function POST(request) {
  const body = await request.json();
  const { movieId, type } = body;
  const { currentUser } = await serverAuth();
  if (!currentUser) {
    return NextResponse("Utilisateur non authentifié !", { status: 401 });
  }

  const favoriteMovies =
    type === TYPE_MOVIE ? "favoriteIdsMovies" : "favoriteIdsSeries";

  const user = await prisma.user.findUnique({
    where: {
      id: currentUser.id,
    },
  });

  if (user?.[favoriteMovies].includes(String(movieId))) {
    return NextResponse("Film ou série déjà dans les favoris !", {
      status: 409,
    });
  }
  const updateUser = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      [favoriteMovies]: {
        push: String(movieId),
      },
    },
  });
  return NextResponse.json(updateUser);
}

export async function DELETE(request) {
  const body = await request.json();
  const { movieId, type } = body;
  const { currentUser } = await serverAuth();
  if (!currentUser) {
    return NextResponse("Utilisateur non authentifié !", { status: 401 });
  }

  const favoriteMovies =
    type === TYPE_MOVIE ? "favoriteIdsMovies" : "favoriteIdsSeries";

  const updateUser = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      [favoriteMovies]: {
        set: currentUser[favoriteMovies].filter((id) => id !== String(movieId)),
      },
    },
  });
  return NextResponse.json(updateUser);
}
