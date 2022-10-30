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
// import NetworksMenu from "./NetworksMenu";

const pages = [
  { label: "Validators", to: "/validators" },
  { label: "Search", to: "/search" },
  { label: "Your Stakes", to: "/stakes" },
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
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            LOGO
          </Typography> */}
          <Box sx={{ mr: 2, display: { xs: "none", md: "flex" } }}>
            <Link href="/" passHref>
              <IconButton>
                <Image
                  src="/SMS_Logo-Round.png"
                  alt="logo"
                  width={50}
                  height={50}
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
              <MenuIcon />
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
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Link
                // style={{ ...navLinkBasicStyles, ...navLinkHeaderStyles }}
                href={page.to}
                key={page.to}
                passHref
              >
                <Button
                  key={page.label}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.label}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <WalletConnection />
          </Box>

          {/* <Box sx={{ flexGrow: 0, marginLeft: "1rem" }}>
            <NetworksMenu />
          </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
