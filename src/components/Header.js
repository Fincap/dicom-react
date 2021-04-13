import {
  Typography,
  AppBar,
  Menu,
  MenuItem,
  Toolbar,
  IconButton,
  CircularProgress,
  makeStyles,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  loadingBar: {
    display: "inline",
    marginLeft: "1em",
    color: theme.palette.primary.contrastText,
  },
  loadingText: {
    display: "inline",
  },
}));

const Header = ({ areScriptsLoaded, menuActions }) => {
  const [anchorEl, setAnchorEl] = useState();
  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onReturnFileSelectClick = () => {
    handleClose();
    menuActions.returnToFileSelect();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          className={classes.menuButton}
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleClick}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={onReturnFileSelectClick}>
            Return to File Select
          </MenuItem>
        </Menu>
        <Typography className={classes.title} variant="h6">
          DICOM-React
        </Typography>
        {!areScriptsLoaded && (
          <>
            <Typography className={classes.loadingText}>
              Loading Pyodide
            </Typography>
            <CircularProgress className={classes.loadingBar} />
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
