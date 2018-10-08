import React, {Component } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import YTSearch from 'youtube-api-search';
import VideoList from './components/video_list';
import VideoDetails from './components/video_detail';
import SearchBar from './components/search_bar';


const API_KEY = 'AIzaSyCmMG1WEq8H2oU_Ri8ThyN0V0VnNlZ96Bo';



class App extends Component {
  constructor(props){
    super(props);

    this.state= {
      videos:[],
      selectedVideo: null
    };
this.videoSearch("Nepalisong");
  }

videoSearch(term) {
  YTSearch({key:API_KEY, term: term}, (videos) => {
    this.setState({
      videos: videos,
      selectedVideo: videos[0]
    });
  } );
}

  render(){

const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);

    return(
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetails video={this.state.selectedVideo} />
        <VideoList
        onVideoSelect ={selectedVideo => this.setState({selectedVideo})}
        videos={this.state.videos} />
      </div>
    );
  }
}


ReactDOM.render(<App />, document.querySelector('.container'));
