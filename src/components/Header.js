import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  CircularProgress,
  makeStyles,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

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
  },
  loadingText: {
    display: "inline",
  },
}));

const Header = ({ scriptsLoaded }) => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          className={classes.menuButton}
          edge="start"
          color="inherit"
          aria-label="open drawer"
        >
          <MenuIcon />
        </IconButton>
        <Typography className={classes.title} variant="h6">
          Test App
        </Typography>
        {scriptsLoaded && (
          <>
            <Typography className={classes.loadingText}>
              Loading Pyodide
            </Typography>
            <CircularProgress
              className={classes.loadingBar}
              color="secondary"
            />
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
