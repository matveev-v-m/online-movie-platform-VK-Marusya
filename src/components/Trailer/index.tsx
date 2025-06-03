import { useState, useRef } from "react";
import YouTube, { YouTubeEvent } from "react-youtube";
import "./index.scss";

export interface TrailerProps {
  trailerModalState: boolean;
  setTrailerModalState: React.Dispatch<React.SetStateAction<boolean>>;
  movieLink: string | undefined;
  movieTitle: string;
}

type YouTubePlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  getPlayerState: () => number;
};

export const Trailer = ({
  trailerModalState,
  setTrailerModalState,
  movieLink,
  movieTitle,
}: TrailerProps) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [showTitleOverlay, setShowTitleOverlay] = useState(false);
  const playerRef = useRef<YouTubePlayer>(null);

  const handleBtnTrailerClose = () => {
    setTrailerModalState(false);
  };

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
      controls: 0,
      modestbranding: 1,
      rel: 0,
      cc_load_policy: 0,
    },
  };

  const onReady = (event: YouTubeEvent<YouTubePlayer>) => {
    playerRef.current = event.target;
    event.target.setVolume(20);
    event.target.setOption("modestbranding", 1);
    event.target.setOption("rel", 0);
    event.target.setOption("cc_load_policy", 0);
  };

  const onStateChange = (event: YouTubeEvent<number>) => {
    if (event.data === 2) {
      setIsPlaying(false);
      setShowTitleOverlay(true);
    } else if (event.data === 1) {
      setIsPlaying(true);
      setShowTitleOverlay(false);
    }
  };

  const togglePlayPause = () => {
    if (!playerRef.current) return;

    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as Element).className === "trailer-modal") {
      handleBtnTrailerClose();
    }
  };

  return (
    <>
      {trailerModalState && (
        <div className="trailer-modal" onClick={handleModalClick}>
          <div className={`trailer-wrap ${isPlaying ? "" : "paused"} `}>
            <YouTube
              videoId={movieLink}
              opts={opts}
              onReady={onReady}
              onStateChange={onStateChange}
              className="youtube-iframe"
            />
            <button
              onClick={togglePlayPause}
              className={`trailer-wrap__play-btn `}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <svg
                  className="trailer-wrap__play-btn__pause"
                  width="20"
                  height="30"
                  viewBox="0 0 20 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 0H3.33333V30H0V0ZM16.6667 0H20V30H16.6667V0Z"
                    fill="black"
                  />
                </svg>
              ) : (
                <svg
                  className="trailer-wrap__play-btn__play"
                  width="26"
                  height="32"
                  viewBox="0 0 26 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 29.6595V2.34035C0 1.0313 1.43992 0.23322 2.55 0.92702L24.4053 14.5867C25.4498 15.2393 25.4498 16.7605 24.4053 17.4133L2.55 31.0728C1.43992 31.7667 0 30.9687 0 29.6595Z"
                    fill="black"
                  />
                </svg>
              )}
            </button>
            {showTitleOverlay && movieTitle && (
              <div className="trailer-wrap__title-overlay">
                <h3>{movieTitle}</h3>
              </div>
            )}
            <button
              onClick={handleBtnTrailerClose}
              className="trailer-wrap__close-btn"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.5859 10L0.792969 2.20706L2.20718 0.792847L10.0001 8.5857L17.793 0.792847L19.2072 2.20706L11.4143 10L19.2072 17.7928L17.793 19.2071L10.0001 11.4142L2.20718 19.2071L0.792969 17.7928L8.5859 10Z"
                  fill="black"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
