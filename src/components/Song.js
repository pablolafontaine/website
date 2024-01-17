'use client';
import useWebSocket from 'react-use-websocket';
import { usePalette } from 'color-thief-react';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

export default function Song() {

	 
	const { lastMessage } = useWebSocket('ws://localhost:8080');
	const songData = lastMessage ? JSON.parse(lastMessage.data) : null
	const [deltaTime, setDeltaTime] = useState(0)
	let { data } = usePalette(songData ? songData.album_image : "", 10, "rgbArray", { crossOrigin: "anonymous", quality: 10  })
	const progressInterval = useRef();
	const currentSong = songData ? songData.id : null;
	
	useEffect(() => {
		return () => clearInterval(progressInterval.current)
	}, [])

	useEffect(() => {
		let startTime = new Date()
		if(currentSong != ""){
		clearInterval(progressInterval.current)
		progressInterval.current = setInterval(() => {
						let currentTime = new Date()
						setDeltaTime(Math.floor((currentTime - startTime)/1000))
					
		}, 500)
	}
	else{
		clearInterval(progressInterval.current)
		progressInterval.current = null
		setDeltaTime(0)
	}
	return () => clearInterval(progressInterval.current) 

	}, [currentSong])

	if (songData && songData.id != "" && data) {
		
		data = data.map(rgbToHsl);
		let colorList = [];
	  
		for (let i = 0; i < data.length; i++) {
		  const [h, s, l] = data[i];
		  if (s >= 0.2 && s <= 0.87 && l >= 25 && l <= 80) {
			colorList.push({ h, s, l });
		  }
		}
	  
	  
		// If no saturated colors were found, use the dominant color with modifications
		let selectedColor = null
		if (colorList.length === 0) {
		  selectedColor = {h: data[0][0], s: data[0][1], l: data[0][2]};
	  
		  if (selectedColor.l > 70) {
			selectedColor.l -= 30
		  } else if (selectedColor.l < 30) {
			selectedColor.l += 30
		  }

		}
		else{
			selectedColor = colorList[0]
	    if(colorList.length > 1){
			selectedColor = colorList[0].s > colorList[1].s ? colorList[0] : colorList[1]
		}
		}
		if(selectedColor.l>60 && selectedColor.s>0.6){
			selectedColor.l-=10
		}

		
		const hslString = `hsl(${selectedColor.h}, ${selectedColor.s * 100}%, ${selectedColor.l}%)`;

		const progress = secondsToTime(Math.floor(songData.progress/1000) + deltaTime)
		
	return (
	  <div style={{ backgroundColor: hslString }} className="rounded-md p-4 flex">
		<Image src={songData.album_image} width={128} height={128} alt="Album Art" className="mr-4 shadow-2xl"/>
		<div className="inline text-gray-200 text-sm">
		<p className="text-xl text-white">{songData.name}</p>
		<p className=""> {songData.artists} </p>
		<p className=""> {progress.h == 0 ? "" : progress.h + ":"}{progress.m}:{progress.s < 10 ? "0"+progress.s : progress.s} </p>
		</div>
	  </div>
	);
	}
	else{
		
		return (
			<>
			</>
		);
	}
  }

  function rgbToHsl(rgb) {
	// Normalize RGB values to be in the range [0, 1]
	const r = rgb[0] / 255;
	const g = rgb[1] / 255;
	const b = rgb[2] / 255;
  
	// Find the minimum and maximum values among R, G, B
	let min = Math.min(r,g,b),
	max = Math.max(r,g,b),
	delta = max - min
  
	// Calculate lightness (L)
	const l = (max + min) / 2;
  
	// Calculate saturation (S)
	let s = 0;
	if (max !== min) {
	  s = l > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min);
	}
  
	// Calculate hue (H)
	let h = 0;
	if (delta == 0)
    h = 0;
	// Red is max
	else if (max == r)
		h = ((g - b) / delta) % 6;
	// Green is max
	else if (max == g)
		h = (b - r) / delta + 2;
	// Blue is max
	else
		h = (r - g) / delta + 4;

	h = Math.round(h * 60);
    
	if (h < 0)
		h += 360;
  
	// Return HSL values
	return [Math.round(h), s, Math.round(l * 100)];
  }

  function secondsToTime(secs){
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
        "h": hours,
        "m": minutes,
        "s": seconds
    };
    return obj;
  };