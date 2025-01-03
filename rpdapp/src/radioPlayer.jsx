import React, { useState, useEffect, useRef } from 'react'
import { Button } from 'antd'
import { PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons'
import { storage } from './firebase';
import { ref, getDownloadURL } from 'firebase/storage';

const RadioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [posterImageSource, setPosterImageSource] = useState(null);
  const [currentShow, setCurrentShow] = useState('');
  const audioRef = useRef(null)

  const webViewContent = `
    <html>
      <head>
        <style>
          .server {
            color: white;
            font-size: 24px;
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 10px;
            box-sizing: border-box;
            width: 100%;
          }
        </style>
      </head>
      <body>
        <div class="server">
          <script type="text/javascript" src="https://cdn.voscast.com/stats/display.js?key=31b8dac67aae02545f7e5a44e2f8ec7c&stats=servertitle"></script>
        </div>
        <script>
          const serverElement = document.querySelector('.server');
          const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
              if (mutation.type === 'childList') {
                window.parent.postMessage(serverElement.innerText, '*');
              }
            });
          });
          observer.observe(serverElement, { childList: true, subtree: true });
        </script>
      </body>
    </html>
  `;

  useEffect(() => {
    // Initialize the audio object with the stream URL
    audioRef.current = new Audio('http://s1.voscast.com:8080/stream');
    
    // Ensure correct MIME type
    audioRef.current.type = 'audio/mpeg';
  
    // Add event listeners for play and pause
    audioRef.current.addEventListener('play', () => setIsPlaying(true));
    audioRef.current.addEventListener('pause', () => setIsPlaying(false));
  
    // Cleanup on component unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  useEffect(() => {
    const handleMessage = async (event) => {
      console.log('Received message:', event.data);
      if (typeof event.data !== 'string') {
        console.error('Received non-string data:', event.data);
        setCurrentShow('');
        setPosterImageSource('Radio-PPI-Dunia-Logo.png');
        return;
      }

      const data = event.data.toLowerCase();
      setCurrentShow(event.data);
      let imagePath = 'Radio-PPI-Dunia-Logo.png';

      switch (true) {
        case data.includes('buka mata'):
          imagePath = 'buka_mata.png';
          break;
        case data.includes('chill out'):
          imagePath = 'chill_out.png';
          break;
        case data.includes('diskografi'):
          imagePath = 'Diskografi-Dian-Web.png';
          break;
        case data.includes('melodi memori'):
          imagePath = 'melodi_memori.png';
          break;
        case data.includes('seputar obrolan psikologi'):
          imagePath = 'sop (1).png';
          break;
        case data.includes('sktchi'):
          imagePath = 'sktchi.png';
          break;
        case data.includes('suka sama'):
          imagePath = 'suka_sama.png';
          break;
        case data.includes('obsesif'):
          imagePath = 'obsesif (1).png';
          break;
        case data.includes('hallyu radio'):
          imagePath = 'hallyu (1).png';
          break;
        case data.includes('dunia kuliner'):
          imagePath = 'dukun (1).png';
          break;    
        default:
          imagePath = 'Radio-PPI-Dunia-Logo.png';
          break;
      }
      const storageRef = ref(storage, `images/${imagePath}`);
      try {
        const url = await getDownloadURL(storageRef);
        setPosterImageSource(url);
      } catch (error) {
        console.error('Error fetching image:', error);
        setPosterImageSource(null);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(error => console.error('Error playing audio:', error))
    }
  }

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause()
    }
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      background: 'linear-gradient(to bottom, #000000, #8B0000)',
      borderRadius: '15px',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
      minHeight: '100vh',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '300px',
        width: '100%'
      }}>
        {posterImageSource && (
          <img src={posterImageSource} alt="Radio Poster" style={{ width: '100%', marginBottom: '20px', borderRadius: '10px' }} />
        )}
        <iframe
          srcDoc={webViewContent}
          style={{
            width: '100%',
            height: '100px',
            border: 'none',
            borderRadius: '5px',
            overflow: 'hidden'
          }}
        />
        <div style={{
          marginTop: '10px',
          color: 'white',
          fontSize: '18px',
          textAlign: 'center'
        }}>
          {/* {currentShow} */}
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '40px',
          marginTop: '30px'
        }}>
          <Button
            type="primary"
            icon={<PlayCircleOutlined style={{ fontSize: '32px' }} />}
            onClick={handlePlay}
            disabled={isPlaying}
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
              transition: 'all 0.3s ease',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontSize: '24px',
              fontWeight: 'bold',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
              background: isPlaying ? 'linear-gradient(145deg, #1890ff, #40a9ff)' : 'linear-gradient(145deg, #4CAF50, #66BB6A)'
            }}
          />
          <Button
            type="primary"
            icon={<PauseCircleOutlined style={{ fontSize: '32px' }} />}
            onClick={handlePause}
            disabled={!isPlaying}
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
              transition: 'all 0.3s ease',
              background: isPlaying ? 'linear-gradient(145deg, #ff4d4f, #ff7875)' : 'linear-gradient(145deg, #1890ff, #40a9ff)',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontSize: '24px',
              fontWeight: 'bold',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)'
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default RadioPlayer