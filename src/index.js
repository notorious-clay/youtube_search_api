import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import SearchBar from './components/search_bar';
import _ from 'lodash';
const API_KEY = ' AIzaSyBdyRbod5mIZO8-eIHT1Gsgff3rE7F3G7U';


class App extends Component{
  constructor (props) {
    super(props);

    this.state = {
      videos: [],
    selectedVideo: null
  };

this.videoSearch('surfboard');

  }


videoSearch(term) {
  YTSearch({key: API_KEY, term: term}, (videos) => {
    this.setState({
      videos: videos,
      selectedVideo: videos[0]
     });
    //this.setState({ videos: videos});
  });

}


  render() {
const videoSearch =_.debounce((term) => {this.videoSearch(term)}, 300);


  return (
   <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
        onVideoSelect={selectedVideo => this.setState({selectedVideo})}
        videos={this.state.videos} />
  </div>
);
}
}




//Take this component generated HTML and put it
//on the page(in the DOM)
React.render(<App />, document.querySelector('.container'));
