import React, { Component } from 'react';
import CustomizedSnackbars from '../SimpleSnackbar';
import FabIntegrationSnackbar from './IntegratedSB';
import Container from '@material-ui/core/Container';
import MediaCard from './PlantCard';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Grid from '@material-ui/core/Grid';
import AddPost from '../Post/AddPost'
import PostCard from '../Post/PostCard';


export default class AlbumHome extends Component {
  constructor(props) {
    super(props);
    this.state = 
    {
      Albums: props.Albums,
      View: 'album',
      Posts: props.Posts,
      currentAlbum: 'Your Albums'
    };
  }

  componentDidUpdate(prevProps) {
    if(prevProps.Albums !== this.props.Albums) {
    this.setState({
      Albums: this.props.Albums
    })
  }
  if(prevProps.Posts !== this.props.Posts) {
    this.setState({
      Posts: this.props.Posts
    })
  }
}



  render() {
    const updateAlbums = this.props.updateAlbums
    const updatePosts = this.props.updatePosts
    const DeleteAlbum = this.props.DeleteAlbum
    const putAlbums = this.props.putAlbums
    const DeletePost = this.props.DeletePost
    const putPosts = this.props.putPosts

    let loadPosts = (selectedAlbum, selectedId) => {
      this.setState({
        View: 'post',
        currentAlbum: selectedAlbum,
        currentAlbumId: selectedId,
      })
    }

    const allAlbums =  this.state.Albums === null ? <div>nothing</div> :
    this.state.Albums.map(function(Albums)   
    {
      console.log(Albums.name);
      return  <div key={Albums.id}>
              <MediaCard postView={loadPosts} albumId={Albums.id} AlbumImage={Albums.imgurl} 
              Title={Albums.albumtitle} Description={Albums.albumdesc} Names={Albums.name} 
              DeleteAlbum={DeleteAlbum} albumDate ={Albums.datestarted}
              putAlbums={putAlbums}
              />
              </div> 
    })
    let currentAlbum = this.state.currentAlbum
    const allPosts =  this.state.Posts === null ? <div>nothing</div> :
    this.state.Posts.map(function(Posts)   
    {
      if (Posts.albumname === currentAlbum) {
      console.log(Posts)
      return  <div key={Posts.id}>
              <PostCard postId={Posts.id} postImage={Posts.postimgurl} postTitle={Posts.posttitle} 
              postDesc={Posts.postdesc} postName={Posts.albumname} putPosts={putPosts}
              DeletePost={DeletePost} postDate={Posts.postdate}
              />
              </div> 
      } else return null
    })

    let backButton = () => {
      this.setState({
        View: 'album',
        currentAlbum: 'Please Select an Album'
      })
    }

    return (
      <div>
        <Container maxWidth="lg">

        {this.state.View === 'post' && <h2 onClick={backButton}><ArrowBackIcon /> Go Back to Albums</h2> }
        <h1 color="primary">{this.state.currentAlbum}</h1>
        { this.state.View === 'album' && <h3 color="primary">Press the plus button to create new Album</h3> }
        <Grid container justify="center" spacing={1} >
        <CustomizedSnackbars />
        { this.state.View ==='album' && <FabIntegrationSnackbar updateAlbums={updateAlbums} /> }
        { this.state.View === 'album' && allAlbums }
        { this.state.View === 'post' && allPosts }
        { this.state.View === 'post' && <AddPost updatePosts={updatePosts} currentAlbum={this.state.currentAlbum} currentId={this.state.currentAlbumId} />}
        
        </Grid>
         </Container>

         </div>
    );
  }
}
