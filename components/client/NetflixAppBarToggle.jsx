/**
 * NetflixAppBarToggle.jsx
 *
 * @param
 * @returns
 */
"use client";

import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import logo from "../../public/assets/netflix-logo.svg";
import avatar from "../../public/assets/netflix-avatar.png";

const NetflixAppBarMenu = ({ anchorEl, setAnchorEl}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();
  const open = Boolean(anchorEl);
  const handleClose = () => {
      setAnchorEl(null);
    };
  return (
    <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        // anchorReference="anchorPosition"
        // anchorPosition={{ top: 50, left: 1680 }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: isMobile ? "left" : "center",
        }}
      >
        <MenuItem onClick={handleClose}>
          <Link href="/">Acceuil</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href="/tv">Series</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href="/movie">Films</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href="/news">Nouveautés</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href="/bookmark">Ma liste</Link>
        </MenuItem>
        <MenuItem
          onClick={async () => {
            const data = await signOut({
              redirect: false,
              callbackUrl: "/auth",
            });
            router.push(data.url);
          }}
        >
          Se déconnecter
        </MenuItem>
      </Menu>
  );
};


const NetflixAppBarToggle = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };
  return (
    <>
      <Image
        className="nav__logo"
        src={logo}
        alt="Logo Netflix"
        />
        <Image
          src={avatar}
          alt="Avatar profil"
          className="nav__avatar nav__avatar--mobile"
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          />
        {anchorEl && <NetflixAppBarMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />}
      </>
  );
};

export { NetflixAppBarToggle };
