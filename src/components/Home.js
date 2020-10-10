import React, { Component } from 'react';
import AlbumHome from './Album/AlbumHome';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = 
    {
      Albums: null,
      Posts: null
    };
  }
  

    componentDidMount() {

            Promise.all([
              fetch('http://localhost:8080/albums'),
              fetch('http://localhost:8080/posts')
            ]).then(function (responses) {
              // Get a JSON object from each of the responses
              return Promise.all(responses.map(function (response) {
                return response.json();
              }));
            }).then((data) => {
              // Log the data to the console
              // You would do something with both sets of data here
              this.setState({
                Albums: data[0],
                Posts: data[1]
              })
            }).catch(function (error) {
              // if there's an error, log it
              console.log(error);
            });
      }


      updateAlbums = (newAlbum) => {
        this.setState({
          Albums: [...this.state.Albums, newAlbum]
        }, () => {
          console.log(this.state.Albums)
        })
      }

      putAlbums = (albumObj) => {
        let newAlbumarr =[];

        this.state.Albums.map((album) => {
          if (album.id === albumObj.id) {
            newAlbumarr.push(albumObj)
            return null
          } else {
            newAlbumarr.push(album)
            return null
          }
        })
        this.setState({
          Albums: newAlbumarr
        })
      }



      DeleteAlbum = (albumId) => {
        let newAlbumArr = []
        console.log(this.state.Albums)
        this.state.Albums.map((album) => {
          if (album.id !== albumId) {
            newAlbumArr.push(album)
          }
          return null
        })
        this.setState({
          Albums: newAlbumArr
        }, () => console.log(this.state.Albums))
      }

      updatePosts = (newPost) => {
        console.log(newPost)
        this.setState({
          Posts: [...this.state.Posts, newPost]
        }, () => {
          console.log(this.state.Posts)
        })
      }

      putPosts = (postObj) => {
        let newPostarr =[];

        this.state.Posts.map((post) => {
          if (post.id === postObj.id) {
            newPostarr.push(postObj)
            return null
          } else {
            newPostarr.push(post)
            return null
          }
        })
        this.setState({
          Posts: newPostarr
        })
      }



      DeletePost = (postId) => {
        let newPostArr = []
        console.log(this.state.Posts)
        this.state.Posts.map((post) => {
          if (post.id !== postId) {
            newPostArr.push(post)
          }
          return null
        })
        this.setState({
          Posts: newPostArr
        }, () => console.log(this.state.Posts))
      }



  render() {
    return (
      <div>
        {
        this.state.Albums == null ? 
        <div>You Have No Albums! Lets get started</div>
        :
        <AlbumHome Albums={this.state.Albums} Posts={this.state.Posts} updatePosts={this.updatePosts} 
        updateAlbums={this.updateAlbums} DeleteAlbum={this.DeleteAlbum} putAlbums={this.putAlbums} 
        putPosts={this.putPosts} DeletePost={this.DeletePost}
        />
        }
         </div>
    );
  }
}
