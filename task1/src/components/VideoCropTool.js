import React, { useRef, useState } from "react";

const VideoCropTool = () => {
  const videoRef = useRef();
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndtime] = useState(10);
  const [duration, setDuration] = useState(0);

  const handleLoadMetadata = () => {
    if (videoRef.current) {
      setEndtime(videoRef.current.duration);
      setDuration(videoRef.current.duration);
    }
  };

  const playCroppedClip = () => {
    videoRef.current.currentTime = startTime;
    videoRef.current.play();
    setTimeout(() => videoRef.current.pause(), (endTime - startTime) * 1000);
  };

  return (
    <div className="video-crop-tool">
      <div className="rsection">
        <div className="video-player-container">
          <video
            ref={videoRef}
            controls
            onLoadedMetadata={handleLoadMetadata}
            src="/test.mp4"
            width="600"
          ></video>
        </div>
        <div className="timeline-container">
          <input
            type="range"
            min="0"
            max={duration}
            step="0.1"
            value={startTime}
            onChange={(e) => setStartTime(parseFloat(e.target.value))}
            className="timeline-slider"
          />
          <input
            type="range"
            min="0"
            max={duration}
            step={0.1}
            value={endTime}
            onChange={(e) => setEndtime(parseFloat(e.target.value))}
            className="timeline-slider"
          />
        </div>
      </div>
      <div className="lsection">
        <div className="details-panel">
          <h3>Clip Details</h3>
          <p>
            <strong>Start Time:</strong>
            {startTime.toFixed(2)}s
          </p>
          <p>
            <strong>End Time:</strong>
            {endTime.toFixed(2)}s
          </p>
          <p>
            <strong>Duration:</strong>
            {(endTime - startTime).toFixed(2)}s
          </p>
          <button onClick={playCroppedClip}>Play cropped Clip</button>
        </div>
      </div>
    </div>
  );
};

export default VideoCropTool;
