"use client";

import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

function PopupLogin({ open, handleClose, signup = false }) {
  const router = useRouter();
  const [create, setCreate] = React.useState(signup);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const handleSignUp = () => {
    setCreate(true);
  };
  const handleSignIn = () => {
    setCreate(false);
  };
  const label = create ? "Inscrivez-vous" : "Connexion";
  async function loginUser(e) {
    e.preventDefault();
    const response = await signIn("credentials", {
      ...data,
      redirect: false,
      callbackUrl: "/",
    });
    // console.log("response", response);
    if (!response.error) {
      setError(false);
      router.push("/");
    }
    if (response.error) {
      setError(true);
    }
  }
  async function registerUser(e) {
    e.preventDefault();
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.status === 200) {
      setError(false);
      router.push("/auth");
    }
    if (response.status === 400 || response.status === 500) {
      setError(true);
    }
  }
  //   const spinner =
  //     status === "fetching " ? <CircularProgress color="secondary" /> : <></>;
  return (
    <>
      <Dialog
        style={{
          backgroundColor: "transparent",
          opacity: "0.9",
        }}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{label}</DialogTitle>
        <DialogContent>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              minWidth: "330px",
            }}
            autoComplete="off"
            onSubmit={create ? registerUser : loginUser}
          >
            <TextField
              id="email"
              label="Email"
              variant="filled"
              color="secondary"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              style={{ opacity: "1" }}
            />
            <TextField
              id="password"
              type="password"
              label="Mot de passe"
              variant="filled"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
            {create ? (
              <>
                <Button
                  style={{ margin: "20px 0 5px 0" }}
                  variant="contained"
                  color="secondary"
                  type="submit"
                >
                  {label}
                </Button>
                <small>* Consultez nos CGV</small>
                <small>This page is protected by Google reCAPTCHA</small>
              </>
            ) : (
              <>
                <Button
                  style={{ margin: "20px 0 5px 0" }}
                  variant="contained"
                  color="secondary"
                  type="submit"
                >
                  {label}
                </Button>
                <div></div>
              </>
            )}
          </form>
          {error ? <Alert severity="error">Problème!!!</Alert> : null}
        </DialogContent>
        <DialogActions style={{ justifyContent: "flex-start" }}>
          {!create ? (
            <Button onClick={handleSignUp} color="secondary">
              Nouveau sur Netflix
            </Button>
          ) : (
            <Button onClick={handleSignIn} color="secondary" autoFocus>
              Vous posséder déjà un compte
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
export { PopupLogin as LoginRegister };
