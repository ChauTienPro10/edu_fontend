import React from 'react';
import YouTube from 'react-youtube';

const YoutubePlayer = ({ videoId ,_height,_width}) => {
  const opts = {
    height: _height,
    width: _width,
    playerVars: {
      autoplay: 0,
    },
  };

  const onReady = (event) => {
    // Truy cập vào player instance và thực hiện các tương tác
    event.target.pauseVideo();
  };

  return <YouTube videoId={videoId} opts={opts} onReady={onReady} />;
};

export default YoutubePlayer;