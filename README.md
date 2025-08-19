# Full Stack RTSP Livestream Overlay App

A web application that streams video from an RTSP source and allows users to add, manage, and display custom overlays (text/logos) in real time.  
**Stack:** Flask (Python), MongoDB, React, FFmpeg.

---

## 🚀 Features

- Livestream RTSP video to web browsers (via HLS)
- Add, position, resize, and remove custom overlays on the video
- Persistent overlay management (CRUD, powered by MongoDB)
- Responsive React frontend
- Easy local setup for developers

---

---

## 🛠️ Prerequisites

- Python 3.8+
- Node.js + npm
- MongoDB (local or Atlas)
- FFmpeg

---

cd backend

python -m venv venv

venv\Scripts\activate


- Set your MongoDB URI in `.env`:

MONGO_URI=mongodb://localhost:27017/

---

### 2. FFmpeg: Convert RTSP to HLS

- Make sure FFmpeg is installed and added to your system PATH.
- Open a separate terminal and run:

ffmpeg -rtsp_transport tcp -i rtsp://YOUR_RTSP_URL -c:v copy -c:a aac -ar 44100 -b:a 128k -f hls -hls_time 2 -hls_list_size 3 -hls_flags delete_segments+append_list backend/static/demo.m3u8

- Replace `rtsp://YOUR_RTSP_URL` with your own source (example: `rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov`)
- Leave the process running while you use the app

---

### 3. Frontend Setup

cd frontend

npm install

Add to `package.json` (top level, not inside dependencies):

"proxy": "http://localhost:5000"

Then start:

npm start

## 🌐 Usage

1. Open [http://localhost:3000](http://localhost:3000) in your browser
2. Click **Play** to start the video stream (required for autoplay permissions)
3. Use the Overlay Editor to create, position, and size overlays
4. Overlays appear instantly on the live video
5. Delete overlays via the editor list if needed

## 🧩 API Endpoints

| METHOD | ENDPOINT             | DESCRIPTION         |
| ------ | -------------------- | ------------------ |
| GET    | /video_feed          | Serves HLS playlist|
| POST   | /overlays            | Create overlay     |
| GET    | /overlays            | Fetch overlays     |
| PUT    | /overlays/&lt;id&gt;      | Update overlay     |
| DELETE | /overlays/&lt;id&gt;      | Delete overlay     |

---

## ⚡ Quickstart

### 1. Backend Setup
