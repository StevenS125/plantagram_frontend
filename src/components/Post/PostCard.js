import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import PostDialog from './PostDialog';
// import { useAuth0 } from "../react-auth0-spa";

const useStyles = makeStyles({
  root: {
    width: 345,
    margin: 10,
  },
  media: {
    height: 200,
  },
});

export default function PostCard(props) {
  const classes = useStyles();
  // const { loading, user } = useAuth0();
  // if (loading || !user) {
  //   return null;
  // }

  return (
    <div>
    {/* { user.name === props.Names ? */}
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={ props.postImage === "" ? "https://plantwebappbucket.s3.us-east-2.amazonaws.com/garden.jpg": props.postImage}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.postTitle}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.postDesc}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
          <PostDialog postDate={props.postDate} 
          postId={props.postId} postTitle={props.postTitle} postDesc={props.postDesc} postAlbumTitle={props.postName}
          postImg={props.postImage} DeletePost={props.DeletePost} putPosts={props.putPosts} />
      </CardActions>
    </Card>
    {/* : 
    <div></div>
} */}
</div>
  );
}
