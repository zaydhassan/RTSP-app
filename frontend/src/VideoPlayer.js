import React, { useRef, useState } from 'react'
import ReactPlayer from 'react-player'

export default function VideoPlayer({ streamUrl, overlays }) {
  const playerRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)

  const handlePlayClick = () => {
    setPlaying(true)
    setMuted(false) 
  }

  return (
    <div style={{ position: "relative", width: "100%", height: "500px" }}>
      <ReactPlayer
        ref={playerRef}
        url={streamUrl}
        playing={playing}
        muted={muted}
        controls
        width="100%"
        height="100%"
        onError={e => alert('Streaming error. Is backend and FFmpeg running?')}
      />
      {overlays.map(ov => (
        <div
          key={ov._id || Math.random()}
          style={{
            position: 'absolute',
            left: ov.position.x,
            top: ov.position.y,
            width: ov.size.w,
            height: ov.size.h,
            color: '#fff',
            background: 'rgba(0,0,0,0.4)',
            pointerEvents: 'none',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          {ov.content}
        </div>
      ))}
      
      {!playing &&
        <button
          style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)', zIndex: 999,
            fontSize: '1.5rem', padding: '0.75em 2em'
          }}
          onClick={handlePlayClick}
        >
          ▶ Play
        </button>
      }
    </div>
  )
}