import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Snackbar from '@material-ui/core/Snackbar';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useAuth0 } from "../../react-auth0-spa";

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.background.paper,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(4),
    right: theme.spacing(4),
    zIndex: 10000,
  },
  snackbar: {
    [theme.breakpoints.down('xs')]: {
      bottom: 90,
    },
  },
}));

export default function FabIntegrationSnackbar(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { isAuthenticated } = useAuth0();
  const { user } = useAuth0();

  const [albumName, setalbumName] = React.useState('');
  const [albumDesc, setalbumDesc] = React.useState('');
  const [albumStart, setalbumStart] = React.useState('');
  const [albumImg, setalbumImg] = React.useState('');

  const handleChange = event => {
    setalbumName(event.target.value);
  };

  const handleDescChange = event => {
    setalbumDesc(event.target.value);
    
  };

  const handleStartChange = event => {
    setalbumStart(event.target.value);
    
  };

  const handleImgChange = event => {
    setalbumImg(event.target.value);
    
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => { 
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        name: user.name,
        albumtitle: albumName,
        albumdesc: albumDesc,
        datestarted: albumStart,
        imgurl: albumImg })
  };
  fetch('http://localhost:8080/albums', requestOptions)
  .then(async response => {
      const data = await response.json();
      console.log(data)
      setOpen(false);
      props.updateAlbums(data);
      
      // check for error response
      if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          return Promise.reject(error);    
      }
  })
  .catch(error => {
      
      console.error('There was an error!', error);
      setOpen(false);
  });
};

  return (
    <React.Fragment>
      <CssBaseline />
      {isAuthenticated && (
      <div>
          <Tooltip title="Create Album" aria-label="add">
        <Fab onClick={handleClickOpen} color="secondary" className={classes.fab}>
          <AddIcon />
        </Fab>
        </Tooltip>
        <Snackbar
          open={false}
          autoHideDuration={6000}
          message="Archived"
          action={
            <Button color="inherit" size="small">
              Undo
            </Button>
          }
          className={classes.snackbar}
        />
              <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create New Plant Album</DialogTitle>
        <DialogContent>
          <TextField
          required
            autoFocus
            margin="dense"
            id="albumName"
            label="Album Name"
            type="text"
            value={albumName}
            onChange={handleChange}
            fullWidth
          />
            <TextField
            required
            autoFocus
            margin="dense"
            id="albumDesc"
            label="Description"
            type="text"
            value={albumDesc}
            onChange={handleDescChange}
            fullWidth
          />
            <TextField
            required
            autoFocus
            margin="dense"
            id="albumStart"
            label="Start Date of Plant"
            type="text"
            value={albumStart}
            onChange={handleStartChange}
            fullWidth
          />
            <TextField
            required
            autoFocus
            margin="dense"
            id="albumStart"
            label="Url of Album Image Cover"
            type="text"
            value={albumImg}
            onChange={handleImgChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
      </div>
      )}
    </React.Fragment>
  );
}
