import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AlbumDialog from './AlbumDialog';
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

export default function MediaCard(props) {
  const classes = useStyles();
  const { user } = useAuth0();


  const handleTab = () => {
    props.postView(props.Title, props.albumId)
  }

  if (props.Names === user.name) {

  return (
    <div>
      
    {/* { user.name === props.Names ? */}
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={ props.AlbumImage === "" ? "https://plantwebappbucket.s3.us-east-2.amazonaws.com/garden.jpg": props.AlbumImage}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.Title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.Description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      {/* <Link to={"/"+props.Title}> */}
        <Button onClick={handleTab} size="small" color="primary">
          View Album
        </Button>
      {/* </Link> */}
        
          <AlbumDialog putAlbums={props.putAlbums} albumDate={props.albumDate} 
          albumId={props.albumId} albumTitle={props.Title} albumDesc={props.Description} 
          albumImg={props.AlbumImage} DeleteAlbum={props.DeleteAlbum} />
        
      </CardActions>
    </Card>
    {/* : 
    <div></div>
} */}
</div>
  )
} else {
  return null
}
}

