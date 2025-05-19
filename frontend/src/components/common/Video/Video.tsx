import { HTMLProps, useEffect, useRef, useState } from "react";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

export interface VideoProps extends HTMLProps<HTMLVideoElement> {
  src: string;
  alt?: string;
}

export default function Video({ src, alt, ...rest }: VideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current?.load();
  }, [src]);

  function handleClick() {
    if (isPlaying) {
      setIsPlaying(false);
      videoRef.current?.pause();
    } else {
      setIsPlaying(true);
      videoRef.current?.play();
    }
  }

  return (
    <div className="relative h-full min-h-100">
      <div
        className={classNames(
          "flex items-center justify-center z-10 absolute w-full h-full",
          { hidden: isPlaying },
        )}
      >
        <button
          onClick={handleClick}
          className="z-10 absolute text-cinebhneutral min-h-12 min-w-12 bg-cinebhdarkred rounded-lg cursor-pointer hover:bg-cinebhlightred"
        >
          <FontAwesomeIcon icon={faPlay} />
        </button>
        <div className="h-full w-full opacity-50 bg-cinebhdarkgray"></div>
      </div>
      <button
        onClick={handleClick}
        className={classNames("w-full h-full absolute z-10", {
          hidden: !isPlaying,
        })}
      />
      <video
        ref={videoRef}
        {...rest}
        preload="metadata"
        className="w-full h-full bg-black"
      >
        <source src={src} type="video/mp4" />
        <source src={src} type="video/webm" />
        <source src={src} type="video/ogg" />
        <img src={alt} alt="fallback image" />
      </video>
    </div>
  );
}
