import React, { useEffect, useRef, useState } from "react";
import "./UI.css";
import image from "../../assests/github.png";
import music from "../../assests/audiowave.gif";
import nomusic from "../../assests/noaudio.png";
import bgaudio from "../../assests/bgmusic.mp3";
import gsap from "gsap";

let audio;

function UI() {
  if (audio === undefined) audio = new Audio(bgaudio);

  const [isPlaying, setPlaying] = useState(false);
  const musicRef = useRef(null);

  audio.addEventListener("ended", () => {
    if (isPlaying) audio.play();
    else audio.pause();
  });

  useEffect(() => {
    if (isPlaying) {
      audio.play();
      gsap.set(musicRef.current, {
        attr: { src: music },
        duration: 1,
        ease: "bounce.out",
      });
    } else {
      audio.pause();
      gsap.set(musicRef.current, {
        attr: { src: nomusic },
        duration: 1,
        ease: "bounce.out",
      });
    }
    audio.addEventListener("ended", () => {
      setPlaying(false);
      setPlaying(true);
    });
  }, [isPlaying]);

  return (
    <>
      <div className="header">
        <h1>WhiteVulpes</h1>
        <a href="https://github.com/White-Vulpes">
          <img src={image} alt="github"></img>
        </a>
      </div>
      <div
        className="music"
        onClick={() => {
          setPlaying(!isPlaying);
        }}
      >
        <img
          ref={musicRef}
          style={{
            height: isPlaying ? "60%" : "45%",
            width: isPlaying ? "60%" : "45%",
            borderRadius: "50%",
            mixBlendMode: "color-burn",
          }}
          src={music}
          alt="audio"
        ></img>
      </div>
    </>
  );
}

export default UI;
