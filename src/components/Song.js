"use client";
import useWebSocket from "react-use-websocket";
import { usePalette } from "color-thief-react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const ScrollingText = styled.a`
  display: inline-block;
  color: white;
  animation: ${(props) =>
    props.$toggle
      ? `title-animation ${props.$textWidth * 50}ms linear infinite`
      : "none"};

  @keyframes title-animation {
    0% {
      transform: translateX(0%);
    }
    20% {
      transform: translateX(0%);
    }
    50% {
      transform: translateX(
        ${(props) =>
          props.$textWidth > props.$containerWidth - 16
            ? -props.$textWidth - 16 + props.$containerWidth
            : 0}px
      );
    }
    70% {
      transform: translateX(
        ${(props) =>
          props.$textWidth > props.$containerWidth - 16
            ? -props.$textWidth - 16 + props.$containerWidth
            : 0}px
      );
    }
    100% {
      transform: translateX(0%);
    }
  }
`;
const ScrollingArtists = styled.div`
  display: inline-block;
  color: white;
  animation: ${(props) =>
    props.$toggle
      ? `artists-animation ${props.$textWidth * 50}ms linear infinite`
      : "none"};
      @keyframes artists-animation {
        0% {
          transform: translateX(0%);
        }
        20% {
          transform: translateX(0%);
        }
        50% {
          transform: translateX(
            ${(props) =>
              props.$textWidth > props.$containerWidth - 16
                ? -props.$textWidth - 16 + props.$containerWidth
                : 0}px
          );
        }
        70% {
          transform: translateX(
            ${(props) =>
              props.$textWidth > props.$containerWidth - 16
                ? -props.$textWidth - 16 + props.$containerWidth
                : 0}px
          );
        }
        100% {
          transform: translateX(0%);
        }
      }
`;

export default function Song() {
  const { lastMessage } = useWebSocket("wss://now-playing-n27h.onrender.com");
  const songData = lastMessage ? JSON.parse(lastMessage.data) : null;
  const [deltaTime, setDeltaTime] = useState(0);
  const [textWidth, setTextWidth] = useState(0);
  const [artistsWidth, setArtistsWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(16);
  const [toggle, setToggle] = useState(false);
  const [resetScroll, setResetScroll] = useState(false);
  

  const scrollContainer = useRef();
  const scrollText = useRef();
  const scrollArtists = useRef();

  const scrollContainerCurr = scrollContainer.current
    ? scrollContainer.current.clientWidth
    : null;

  let { data } = usePalette(
    songData ? songData.album_image : "",
    10,
    "rgbArray",
    { crossOrigin: "anonymous", quality: 10 },
  );

  const progressInterval = useRef();

  const currentSong = songData ? songData.id : null;

  const artists = currentSong
    ? Object.keys(songData.artists).map((key, i) => {
        if (i != Object.keys(songData.artists).length - 1) {
          return (
            <div key={key} className="flex  pr-[0.25em] text-white">
              <a className="text-white" href={songData.artists[key]}>
                {key}
              </a>{" "}
              <p>,</p>
            </div>
          );
        } else {
          return (
            <a
              key={key}
              className="text-white pr-[0.25em]"
              href={songData.artists[key]}
            >
              {key}
            </a>
          );
        }
      })
    : null;
  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    return () => {
      clearInterval(progressInterval.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function handleResize() {
    setResetScroll(!resetScroll);
  }

  useEffect(() => {
    if (scrollText.current && scrollContainer.current) {
      setContainerWidth(scrollContainer.current.clientWidth);
      setTextWidth(scrollText.current.clientWidth);
      setArtistsWidth(scrollArtists.current.clientWidth);
      setToggle(false);
    }
  }, [
    scrollContainerCurr,
    scrollContainer.current,
    scrollText.current,
    resetScroll,
    currentSong,
  ]);

  useEffect(() => {
    const startTime = new Date();
    if (currentSong && songData) {
      clearInterval(progressInterval.current);
      progressInterval.current = setInterval(() => {
        const currentTime = new Date();
        setDeltaTime(Math.floor((currentTime - startTime) / 1000));
        setToggle(true);
      }, 500);
    } else {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
      setDeltaTime(0);
    }
    return () => clearInterval(progressInterval.current);
  }, [currentSong]);

  if (songData && songData.id != "" && data) {
    data = data.map(rgbToHsl);
    const colorList = [];

    for (let i = 0; i < data.length; i++) {
      const [h, s, l] = data[i];
      if (s >= 0.2 && s <= 0.87 && l >= 25 && l <= 80) {
        colorList.push({ h, s, l });
      }
    }

    let selectedColor = null;
    if (colorList.length === 0) {
      selectedColor = { h: data[0][0], s: data[0][1], l: data[0][2] };

      if (selectedColor.l > 70) {
        selectedColor.l -= 30;
      } else if (selectedColor.l < 30) {
        selectedColor.l += 30;
      }
    } else {
      selectedColor = colorList[0];
      if (colorList.length > 1) {
        selectedColor =
          colorList[0].s > colorList[1].s ? colorList[0] : colorList[1];
      }
    }
    if (selectedColor.l > 65) {
      selectedColor.l = 65;
    }

    const hslString = `hsl(${selectedColor.h}, ${selectedColor.s * 100}%, ${
      selectedColor.l
    }%)`;
    const hslaString = `hsl(${selectedColor.h}, ${selectedColor.s * 100}%, ${
      selectedColor.l
    }%, 0.0)`;

    const progress = secondsToTime(
      Math.floor(songData.progress / 1000) + deltaTime,
    );
    const duration = secondsToTime(Math.floor(songData.duration / 1000));
    const progressPercent =
      ((songData.progress + deltaTime * 1000) / songData.duration) * 100;
    return (
      <div
        style={{ backgroundColor: hslString }}
        className="rounded-md p-2 flex w-[250px] lg:w-[400px] xl:w-[400px] m-auto items-center h-full"
      >
        <a
          href={songData.album_url}
          className="z-20 flex-none w-[64px] h-[64px] lg:w-[96px] lg:h-[96px] xl:w-[128px] xl:h-[128px]"
        >
          <Image
            src={songData.album_image}
            width={128}
            height={128}
            alt="Album Art"
            className="w-full shadow-black shadow-2xl"
          />
        </a>
        <div
          className="pl-4 relative inline text-gray-200 text-sm w-full truncate z-0"
          ref={scrollContainer}
        >
          <div
            className="h-full top-0 left-0 w-4 absolute z-10"
            style={{
              backgroundImage: `linear-gradient(to right, ${hslString}, ${hslaString})`,
            }}
          />
          <div className="w-full pb-0 text-white text-md xl:text-xl font-semibold">
            <ScrollingText
              href={songData.song_url}
              ref={scrollText}
              title={songData.name}
              $textWidth={textWidth}
              $containerWidth={containerWidth}
              $toggle={toggle}
            >
              {songData.name}
            </ScrollingText>
          </div>
          <ScrollingArtists 
          ref={scrollArtists}
          $textWidth={artistsWidth}
              $containerWidth={containerWidth}
              $toggle={toggle}>
          <div className="flex text-nowrap whitespace-nowrap">{artists}</div>
          </ScrollingArtists>
          <div>
          <a
            className="hidden lg:block overflow-hidden text-ellipsis whitespace-nowrap text-gray-200"
            title={songData.album_name}
            href={songData.album_url}
          >
            {" "}
            on {songData.album_name}{" "}
          </a>
          </div>
          <div className="pt-0 lg:pt-2 inline-flex w-full items-center">
            <p>
              {" "}
              {progress.h == 0 ? "" : progress.h + ":"}
              {progress.m}:{progress.s < 10 ? "0" + progress.s : progress.s}{" "}
            </p>
            <div className="bg-white/20 mx-2 rounded-md h-[0.4em] w-full">
              <div
                style={{ width: `${progressPercent}%` }}
                className={"bg-white rounded-md h-full"}
              ></div>
            </div>
            <p>
              {" "}
              {duration.h == 0 ? "" : duration.h + ":"}
              {duration.m}:{duration.s < 10 ? "0" + duration.s : duration.s}{" "}
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}

function rgbToHsl(rgb) {
  // Normalize RGB values to be in the range [0, 1]
  const r = rgb[0] / 255;
  const g = rgb[1] / 255;
  const b = rgb[2] / 255;

  // Find the minimum and maximum values among R, G, B
  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);
  const delta = max - min;

  // Calculate lightness (L)
  const l = (max + min) / 2;

  // Calculate saturation (S)
  let s = 0;
  if (max !== min) {
    s = l > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min);
  }

  let h = 0;
  if (delta == 0) {
    h = 0;
  } else if (max == r) {
    h = ((g - b) / delta) % 6;
  } else if (max == g) {
    h = (b - r) / delta + 2;
  } else {
    h = (r - g) / delta + 4;
  }

  h = Math.round(h * 60);

  if (h < 0) {
    h += 360;
  }

  // Return HSL values
  return [Math.round(h), s, Math.round(l * 100)];
}

function secondsToTime(secs) {
  const hours = Math.floor(secs / (60 * 60));

  const minutesDivisor = secs % (60 * 60);
  const minutes = Math.floor(minutesDivisor / 60);

  const secondsDivisor = minutesDivisor % 60;
  const seconds = Math.ceil(secondsDivisor);

  const obj = {
    h: hours,
    m: minutes,
    s: seconds,
  };
  return obj;
}
