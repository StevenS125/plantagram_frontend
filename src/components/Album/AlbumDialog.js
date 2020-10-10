import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useAuth0 } from "../../react-auth0-spa";

export default function AlbumDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [albumTitle, setalbumTitle] = React.useState(props.albumTitle);
  const [albumDesc, setalbumDesc] = React.useState(props.albumDesc);
  const [albumImg, setalbumImg] = React.useState(props.albumImg);
  const { user } = useAuth0();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTitleChange = event => {
    setalbumTitle(event.target.value);
  };

  const handleDescChange = event => {
    setalbumDesc(event.target.value);
  };

  const handlealbumImgChange = event => {
    setalbumImg(event.target.value);
  };

  const deleteAlbum = () => {
      console.log("Deleted album " + props.albumId)
      const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    };
    fetch('http://localhost:8080/albums/' + props.albumId, requestOptions)
    .then(async response => {
        const data = await response.json();
        console.log(data)
        setOpen(false);
        props.DeleteAlbum(data.id);
        
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
  }

  const handleUpdate = (event) => { 
      console.log("Updated Album " + props.albumId)
    event.preventDefault();
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        id: props.albumId,
        name: user.name,
        albumtitle: albumTitle,
        albumdesc: albumDesc,
        datestarted: props.albumDate,
        imgurl: albumImg })
  };
  fetch('http://localhost:8080/albums/' + props.albumId, requestOptions)
  .then(async response => {
      const data = await response.json();
      console.log(data)
      setOpen(false);
      props.putAlbums(data)
      
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
    <div>
      <Button color="primary" onClick={handleClickOpen}>
        Edit Album
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Album</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To Edit Album Change Fields Below
            {props.albumTitle}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="albumTitle"
            label="Album Title"
            type="text"
            value={albumTitle}
            onChange={handleTitleChange}
            fullWidth
          />
        <TextField
            autoFocus
            margin="dense"
            id="albumDesc"
            label="Album Description"
            type="email"
            value={albumDesc}
            onChange={handleDescChange}
            fullWidth
          />
        <TextField
            autoFocus
            margin="dense"
            id="albumUrl"
            label="Album Cover Image url"
            type="text"
            value={albumImg}
            onChange={handlealbumImgChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
        <Button color="secondary" onClick={deleteAlbum}>
            Delete Album 
            </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}