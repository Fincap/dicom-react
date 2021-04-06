import {Typography, AppBar, Toolbar} from '@material-ui/core';

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography>
          Test App
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
