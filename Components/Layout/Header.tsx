import { useState, MouseEvent } from "react";
import Image from "next/image";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import WalletConnection from "../WalletConnection";

const pages = [
  { label: "Games", to: "/games" },
  { label: "Your Stakes", to: "/stakes" },
  { label: "Search", to: "/search" },
  { label: "Validators", to: "/validators" },
];

const navLinkBasicStyles: React.CSSProperties = {
  textDecoration: "none",
};

const navLinkMenuStyles: React.CSSProperties = {
  color: "black",
};

const navLinkHeaderStyles: React.CSSProperties = {
  color: "white",
};

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "5rem",
        minWidth: "30rem",
        width: "80%",
        maxWidth: "60rem",
        mx: "auto",
        borderRadius: "50px",
        backgroundColor: "white",
      }}
      position="static"
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ mr: 2, display: { xs: "none", md: "flex" } }}>
            <Link href="/" passHref>
              <IconButton>
                <Image
                  src="/sms_logo_round.png"
                  alt="logo"
                  width={65}
                  height={65}
                />
              </IconButton>
            </Link>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon color="primary" />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <Link
                  // style={{ ...navLinkBasicStyles, ...navLinkMenuStyles }}
                  href={page.to}
                  key={page.to}
                  passHref
                >
                  <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                    {page.label}
                    {/* <Typography textAlign="center">{page.label}</Typography> */}
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          {/* <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            LOGO
          </Typography> */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: { sx: "none", md: "center" },
            }}
          >
            {pages.map((page) => (
              <Link
                style={{ margin: "0 0.8rem" }}
                href={page.to}
                key={page.to}
                passHref
              >
                <Button
                  key={page.label}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "black",
                    display: "block",
                    fontSize: "1.2rem",
                  }}
                >
                  {page.label}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <WalletConnection />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
