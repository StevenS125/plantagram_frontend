import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useAuth0 } from "../../react-auth0-spa";

const useStyles = makeStyles({
  root: {
    width: 345,
    margin: 10,
  },
  media: {
    height: 200,
  },
});

export default function AddPost(props) {
  const { user } = useAuth0();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [postdesc, setpostdesc] = React.useState('');
  const [postimgurl, setpostimgurl] = React.useState('');
  const [posttitle, setposttitle] = React.useState('');
  // const postDate = new Date();


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleTitleChange = event => {
    setposttitle(event.target.value);
    
  };

  const handleDescChange = event => {
    setpostdesc(event.target.value);
    
  };

  const handleImgChange = event => {
    setpostimgurl(event.target.value);
  };


  const handleSubmit = (event) => { 
    console.log('tacos')
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        username: user.name,
        albumname: props.currentAlbum,
        posttitle : posttitle,
        postdesc: postdesc,
        postdate: new Date(),
        postimgurl: postimgurl })
  };
  fetch('http://localhost:8080/posts', requestOptions)
  .then(async response => {
      const data = await response.json();
      console.log(data)
      setOpen(false);
      props.updatePosts(data);
      
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
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://gozo.news/wp-content/uploads/2019/10/Budget_BLM-345x200.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {/* {props.Posts.Heading} */}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {/* {props.Posts.Description} */}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button onClick={handleClickOpen} size="large" color="primary">
          Add New Post
        </Button>
      </CardActions>
    </Card>

    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add a New Post!</DialogTitle>
        <DialogContent>
        <TextField
            autoFocus
            margin="dense"
            id="posTitle"
            label="Post Title"
            type="text"
            value={posttitle}
            fullWidth
            onChange={handleTitleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="postDesc"
            label="Post Description"
            type="text"
            value={postdesc}
            fullWidth
            onChange={handleDescChange}
          />
            <TextField
            autoFocus
            margin="dense"
            id="postImg"
            label="Image Url"
            type="text"
            value={postimgurl}
            fullWidth
            onChange={handleImgChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit 
          </Button>
        </DialogActions>
      </Dialog>
    {/* : 
    <div></div>
} */}
</div>

  );
}
