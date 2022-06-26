import { useEffect, useState } from "react";
import styles from "../styles/Audios.module.css";
import {
  IoPlayCircle,
  IoPlaySkipForward,
  IoPlaySkipBack,
  IoStopCircle,
} from "react-icons/io5";

const music = [
  {
    artist: "MasterClass",
    title: "A Glimmer Of Light",
  },
  {
    artist: "prima",
    title: "distant moon",
  },
  {
    artist: "Sumsay",
    title: "night plans",
  },
  {
    artist: "Xori",
    title: "Glow",
  },
];

const Audios = () => {
  const [volume, setVolume] = useState(50);
  const [musicIndex, setMusicIndex] = useState(0);
  const [isPlay, setIsPlay] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement>();
  const VolumeChange = (e: any) => {
    console.log(e.target.value);
    if (isPlay) {
      setVolume(e.target.value);
    }
  };

  const setChange = (v: string) => {
    if (v === "up") {
      setMusicIndex((musicIndex + 1) % music.length);
    } else {
      setMusicIndex(musicIndex === 0 ? music.length - 1 : musicIndex - 1);
    }
  };
  const setMusic = () => {
    if (isPlay) {
      setIsPlay(false);
    } else {
      setIsPlay(true);
    }
    if (!audio) {
      setAudio(new Audio());
    } else {
      audio.src = `audio/${music[musicIndex].artist}-${music[musicIndex].title}.mp3`;
    }
  };

  useEffect(() => {
    if (!audio) {
      setAudio(new Audio());
    } else {
      audio.src = `audio/${music[musicIndex].artist}-${music[musicIndex].title}.mp3`;
      if (isPlay) {
        audio.load();
        audio.play();
        audio.volume = volume * 0.01;
        audio.addEventListener("ended", () => setChange("up"));
      }
    }
  }, [musicIndex]);
  useEffect(() => {
    if (!audio) {
      setAudio(new Audio());
    } else {
      audio.volume = volume * 0.01;
    }
  }, [volume]);
  useEffect(() => {
    if (!audio) {
      setAudio(new Audio());
    } else {
      if (isPlay) {
        audio.load();
        audio.play();
        audio.volume = volume * 0.01;
        audio.addEventListener("ended", () => setChange("up"));
      } else {
        audio.pause();
      }
    }
  }, [isPlay]);

  useEffect(() => {
    if (!audio) {
      setAudio(new Audio());
    }
  }, []);

  return (
    <div className={styles.layout}>
      <div className={styles.musicPlayer}>
        <div className={styles.musicdetail}>
          <p>{music[musicIndex].title}</p>
          <span>{music[musicIndex].artist}</span>
        </div>
        <div className={styles.musicBtn}>
          <IoPlaySkipBack
            size={30}
            onClick={() => {
              setChange("down");
            }}
          />
          {isPlay ? (
            <IoStopCircle size={30} onClick={setMusic} />
          ) : (
            <IoPlayCircle size={30} onClick={setMusic} />
          )}
          <IoPlaySkipForward
            size={30}
            onClick={() => {
              setChange("up");
            }}
          />
          <div className={styles.volumediv}>
            <input
              className={styles.volume}
              type={"range"}
              id="volume"
              min="0"
              max="100"
              onChange={VolumeChange}
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Audios;
