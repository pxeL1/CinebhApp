import { HTMLProps, useState } from "react";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

export interface VideoProps extends HTMLProps<HTMLVideoElement> {
  src?: string;
}

export default function Video({ src, ...rest }: VideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const video: HTMLVideoElement = document.getElementsByTagName("video")[0];

  function handleClick() {
    if(isPlaying) {
      setIsPlaying(false);
      video.pause();
    } else {
      setIsPlaying(true);
      video.play();
    }

  }

  return (
    <div className="relative h-full">
      <div
        className={classNames(
          "flex items-center justify-center z-10 absolute w-full h-full",
          {"hidden": isPlaying}
        )
        }
      >
        <button onClick={handleClick} className="z-10 absolute text-cinebhneutral min-h-12 min-w-12 bg-cinebhdarkred rounded-lg cursor-pointer hover:bg-cinebhlightred">
          <FontAwesomeIcon icon={faPlay} />
        </button>
        <div className="h-full w-full opacity-50 bg-cinebhdarkgray"></div>
      </div>
      <button onClick={handleClick} className={classNames(
        "w-full h-full absolute z-10",
        {"hidden": !isPlaying}
      )}/>
      <video {...rest} preload="metadata" className="h-full">
        <source src={src} />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
