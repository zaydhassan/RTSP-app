import React, { useEffect, useState } from 'react'
import axios from 'axios'
import VideoPlayer from './VideoPlayer'
import OverlayEditor from './OverlayEditor'

function App() {
  const [overlays, setOverlays] = useState([])

  function fetchOverlays() {
    axios.get('/overlays')
      .then(res => setOverlays(res.data))
      .catch(() => setOverlays([]))
  }
  useEffect(() => { fetchOverlays() }, [])

  return (
    <div>
      <h2>Full Stack Livestream RTSP App</h2>
      <VideoPlayer streamUrl="/video_feed" overlays={overlays} />
      <OverlayEditor overlays={overlays} refreshOverlays={fetchOverlays} />
    </div>
  )
}
export default App