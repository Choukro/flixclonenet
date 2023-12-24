import prisma from "./prisma";
import { authConfig } from "../app/api/auth/[...nextauth]/option";
import { getServerSession } from "next-auth";

const serverAuth = async () => {
  const session = await getServerSession(authConfig);
  if (!session.user) {
    throw new Error("Utilisateur non authentifié !");
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) {
    throw new Error("Utilisateur non authentifié !");
  }
  return { currentUser };
};

export default serverAuth;
