import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useAuth0 } from "../../react-auth0-spa";

export default function PostDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [postTitle, setPostTitle] = React.useState(props.postTitle);
  const [postDesc, setPostDesc] = React.useState(props.postDesc);
  const [postImg, setPostImg] = React.useState(props.postImg);
  const { user } = useAuth0();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTitleChange = event => {
    setPostTitle(event.target.value);
  };

  const handleDescChange = event => {
    setPostDesc(event.target.value);
  };

  const handlealbumImgChange = event => {
    setPostImg(event.target.value);
  };

  const DeletePost = () => {
      console.log("Deleted Post " + props.postId)
      const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    };
    fetch('http://localhost:8080/posts/' + props.postId, requestOptions)
    .then(async response => {
        const data = await response.json();
        console.log(data)
        setOpen(false);
        props.DeletePost(data.id);
        
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
      console.log("Updated Album " + props.postId)
    event.preventDefault();
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        id: props.postId,
        username: user.name,
        albumname: props.postAlbumTitle,
        posttitle: postTitle,
        postdesc: postDesc,
        postdate: props.postDate,
        postimgurl: postImg })
  };
  fetch('http://localhost:8080/posts/' + props.postId, requestOptions)
  .then(async response => {
      const data = await response.json();
      console.log(data)
      setOpen(false);
      props.putPosts(data)
      
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
        Edit Post
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
            id="postTitle"
            label="Post Title"
            type="text"
            value={postTitle}
            onChange={handleTitleChange}
            fullWidth
          />
        <TextField
            autoFocus
            margin="dense"
            id="postDesc"
            label="Post Description"
            type="text"
            value={postDesc}
            onChange={handleDescChange}
            fullWidth
          />
        <TextField
            autoFocus
            margin="dense"
            id="postUrl"
            label="Post Cover Image url"
            type="text"
            value={postImg}
            onChange={handlealbumImgChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
        <Button color="secondary" onClick={DeletePost}>
            Delete Post 
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