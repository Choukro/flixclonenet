import * as React from "react";
import { render, screen } from "../../test/test-utils";
import { LoginRegister } from "../LoginRegister";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";
import "@testing-library/jest-dom";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("LoginRegister Component", () => {
  it("redirects to the correct page on button click", async () => {
    const connexion = "S'identifier";
    const register = "Inscrivez-vous.";
    render(<LoginRegister open={true}></LoginRegister>);
    expect(
      screen.getByRole("heading", { name: connexion })
    ).toBeInTheDocument();
    // Utilisation du bouton "Inscrivez-vous" pour changer l'état et afficher le formulaire d'inscription
    const registerButton = screen.getByText(register);
    await userEvent.click(registerButton);

    // Vérifie que le composant affiche maintenant le formulaire d'inscription
    expect(
      screen.getByRole("heading", { name: "Inscrivez-vous" })
    ).toBeInTheDocument();
  });
});
