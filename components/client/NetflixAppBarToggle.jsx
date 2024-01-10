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

const NetflixAppBarToggle = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Image
        className="nav__logo"
        src="/assets/netflix-logo.svg"
        alt="Logo Netflix"
        height={30}
        width={96}
      />
      <Image
        src="/assets/netflix-avatar.png"
        alt="Avatar profil"
        height={30}
        width={96}
        className="nav__avatar nav__avatar--mobile"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      />
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
          horizontal: "center",
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
    </>
  );
};

export { NetflixAppBarToggle };
