import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Snackbar from '@material-ui/core/Snackbar';
import { useAuth0 } from "../react-auth0-spa";
import Avatar from '@material-ui/core/Avatar';
import clsx from 'clsx';
import List from '@material-ui/core/List';
// import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SvgIcon from '@material-ui/core/SvgIcon';
import EcoIcon from '@material-ui/icons/Eco';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Link from '@material-ui/core/Link';



const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
}));

export default function MenuAppBar() {
  const classes = useStyles();
  const [setAuth] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { isAuthenticated, loginWithRedirect, logout, user, loading } = useAuth0();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  function HomeIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    );
  }

  const list = anchor => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >

      <List>
          <Link href="/" color="inherit">
          <ListItem button>
          <ListItemIcon><HomeIcon color="primary" /></ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          </Link>
        </List>
      <List>
      <Link href="/" color="inherit">
          <ListItem button>
          <ListItemIcon><EcoIcon color="primary" /></ListItemIcon>
            <ListItemText primary="Albums" />
          </ListItem>
      </Link>
        </List>

      <List>
      <Link href="/profile" color="inherit">
          <ListItem button>
          <ListItemIcon><AccountCircleIcon color="primary" /></ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
        </Link>
        </List>
    </div>
  );

  const handleChange = event => {
    isAuthenticated ? logout(): loginWithRedirect({});

    setAuth(event.target.checked);
  };


  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={classes.root}>
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={isAuthenticated ? true : false} onChange={handleChange} aria-label="login switch" />}
          label={isAuthenticated ? 'Logout' : 'Login'}
        />
      </FormGroup>
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={toggleDrawer('left', true)}  edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon style={{color: 'white'}} />
          </IconButton>
          <Typography style={{color: 'white'}} variant="h6" className={classes.title}>
            Plant Power
          </Typography>
          {isAuthenticated && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
              >
                <Avatar aria-label="recipe" className={classes.avatar}>
            {user.name.charAt(0).toUpperCase()}
          </Avatar>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <Link style={{ textDecoration: 'none', color: 'black' }} to="/profile"><MenuItem onClick={handleClose}>Profile</MenuItem></Link>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <Snackbar />
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      
        <React.Fragment key={'left'}>
          <SwipeableDrawer
            anchor={'left'}
            open={state['left']}
            onClose={toggleDrawer('left', false)}
            onOpen={toggleDrawer('left', true)}
          >
            {list('left')}
          </SwipeableDrawer>
        </React.Fragment>


      {/* {isAuthenticated && (
      <span>
        <Link to="/">Home</Link>&nbsp;
        <Link to="/profile">Profile</Link>
      </span>
    )} */}
    </div>
  );
}