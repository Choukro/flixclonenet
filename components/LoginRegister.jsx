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
import { styled } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const CssDialogue = styled(Dialog)({
  "& .MuiBackdrop-root": {
    opacity: "0!important",
  },
  "& .MuiDialog-container": {
    opacity: "0.85!important",
  },
});

const CssTextField = styled(TextField)({
  "& .MuiFormLabel-root": {
    color: "#8c8c8c",
    "&.Mui-focused": {
      color: "#8c8c8c",
    },
  },
  "& .MuiFilledInput-input": {
    color: "#fff",
  },
  "& .MuiFilledInput-root": {
    "&:after": {
      borderColor: "#e87c03",
    },
  },
});

function PopupLogin({ open, handleClose, signup = false }) {
  const [message, setMessage] = useState("");
  const router = useRouter();
  const [create, setCreate] = React.useState(signup);
  const [isLoading, setIsLoading] = useState(false);
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
  const label = create ? "Inscrivez-vous" : "S'identifier";
  async function loginUser(e) {
    setIsLoading(true);
    e.preventDefault();
    const response = await signIn("credentials", {
      ...data,
      redirect: false,
      callbackUrl: "/",
    });
    console.log("response", response);
    // const responseData = await response.json();
    if (response.ok) {
      setError(false);
      router.push("/");
      setIsLoading(false);
    }
    if (response.error) {
      setMessage(response.error);
      setError(true);
      setIsLoading(false);
    }
  }
  async function registerUser(e) {
    setIsLoading(true);
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
      setIsLoading(false);
      router.push("/auth");
    }
    if (response.status === 400 || response.error) {
      setIsLoading(false);
      setMessage(response.error);
      setError(true);
    }
  }
  //   const spinner =
  //     status === "fetching " ? <CircularProgress color="secondary" /> : <></>;
  return (
    <>
      <CssDialogue
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="popup-login"
      >
        <DialogTitle
          id="alert-dialog-title"
          style={{
            backgroundColor: "rgba(0,0,0)",
            color: "#fff",
            fontWeight: "500",
            paddingTop: "2rem",
            paddingBottom: "2rem",
            fontSize: "1.75rem",
          }}
        >
          {label}
        </DialogTitle>
        <DialogContent
          style={{
            backgroundColor: "rgba(0,0,0)",
          }}
        >
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              minWidth: "330px",
            }}
            autoComplete="off"
            onSubmit={create ? registerUser : loginUser}
          >
            <CssTextField
              id="email"
              label="Email"
              type="email"
              variant="filled"
              autoComplete="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="popup-login__input"
              required
            />
            <CssTextField
              id="password"
              type="password"
              label="Mot de passe"
              autoComplete="current-password"
              variant="filled"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              className="popup-login__input"
              required
            />
            {create ? (
              <>
                <Button
                  style={{
                    margin: "20px 0 5px 0",
                    backgroundColor: "#E50914",
                    textTransform: "none",
                    fontWeight: "bold",
                  }}
                  variant="contained"
                  type="submit"
                >
                  {!isLoading ? (
                    label
                  ) : (
                    <CircularProgress style={{ color: "white" }} size={24} />
                  )}
                </Button>
              </>
            ) : (
              <>
                <Button
                  style={{
                    margin: "20px 0 5px 0",
                    backgroundColor: "#E50914",
                    textTransform: "none",
                    fontWeight: "700",
                  }}
                  variant="contained"
                  type="submit"
                >
                  {!isLoading ? (
                    label
                  ) : (
                    <CircularProgress style={{ color: "white" }} size={24} />
                  )}
                </Button>
                <div></div>
              </>
            )}
          </form>
        </DialogContent>
        <DialogActions
          style={{
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0)",
          }}
        >
          {!create ? (
            <div className="login-signup-now">
              <div className="login-signup-now__text">
                Première visite sur netflix ?&nbsp;
                <span className="login-signup-now__link" onClick={handleSignUp}>
                  Inscrivez-vous.
                </span>
              </div>
              <div className="login-signup-now__small">
                <small>
                  L&apos;identification est protégée par Google reCAPTCHA
                </small>
                <small>
                  pour nous assurer que vous n&apos;êtes pas un robot.
                </small>
              </div>
            </div>
          ) : (
            <div className="login-signup-now">
              <div className="login-signup-now__text">
                Vous avez déjà un compte ?&nbsp;
                <span className="login-signup-now__link" onClick={handleSignIn}>
                  Connectez-vous.
                </span>
              </div>
              <div className="login-signup-now__small">
                <small>
                  L&apos;identification est protégée par Google reCAPTCHA
                </small>
                <small>
                  pour nous assurer que vous n&apos;êtes pas un robot.
                </small>
              </div>
            </div>
          )}
        </DialogActions>
      </CssDialogue>
      {error && (
        <Alert
          severity="error"
          variant="filled"
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            right: "0",
            zIndex: "999",
          }}
        >
          {create
            ? `Une erreur est survenue lors de l'inscription : ${message} !`
            : `Une erreur est survenue lors de la connexion : ${message} !`}
        </Alert>
      )}
    </>
  );
}
export { PopupLogin as LoginRegister };
