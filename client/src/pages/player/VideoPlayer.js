import React, { useRef } from 'react';
import { ControlBar, CurrentTimeDisplay, ForwardControl, PlaybackRateMenuButton, Player, ReplayControl, TimeDivider, VolumeMenuButton } from 'video-react';
import 'video-react/dist/video-react.css';
import './VideoPlayer.css';

const VideoPlayer = () => {
  const playerRef = useRef(null);

  const handleVideoClick = (event) => {
    const { offsetX, target } = event.nativeEvent;
    const { width } = target.getBoundingClientRect();

    // Calculate the click position as a percentage of the video width
    const clickPercentage = (offsetX / width) * 100;

    // Adjust the threshold according to your design
    const threshold = 30;

    // Access the current state of the player to get the current time
    const currentTime = playerRef.current.getState().player.currentTime;

    // Check if the click is on the left side (backward) or right side (forward)
    if (clickPercentage < threshold) {
      // Click on the left side (backward)
      playerRef.current.seek(currentTime - 10);
    } else if (clickPercentage > 100 - threshold) {
      // Click on the right side (forward)
      playerRef.current.seek(currentTime + 10);
    }

    // Manually play the video
    playerRef.current.video.play();
  };

  const handleVideoDoubleClick = (event) => {
    // Prevent the default behavior of the double-tap gesture
    event.preventDefault();
  };

  return (
    <div  onClick={handleVideoClick} className='video'>
      <h2>Video Player</h2>
      <div className="video-player">
      <Player
      
        autoPlay
        src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
        ref={playerRef}
        onDoubleClick={handleVideoDoubleClick}
      >
        <ControlBar>
          <ReplayControl seconds={10} order={1.1} />
          <ForwardControl seconds={10} order={1.2} />
          <CurrentTimeDisplay order={4.1} />
          <TimeDivider order={4.2} />
          <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
          <VolumeMenuButton vertical />
        </ControlBar>
      </Player>
      </div>
    </div>
  );
};

export default VideoPlayer;
