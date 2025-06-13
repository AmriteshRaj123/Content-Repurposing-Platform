# 🎥 ContentFlow - AI-Powered Content Repurposing Platform

ContentFlow is a smart and interactive platform built using **React.js** that allows users to upload a single piece of content (video, audio, or text) and automatically repurpose it into multiple formats tailored for different platforms like Instagram Reels, YouTube Shorts, TikTok, LinkedIn, Twitter, and more.

---

## 🚀 Features

- 📤 Upload support for video, audio, and text formats
- 🔗 Extract content from URLs (e.g., YouTube, Vimeo)
- 🧠 AI-simulated content repurposing into 8+ platform formats
- 🎬 Format-specific generation: Reels, Shorts, Blog posts, Threads, Podcasts, etc.
- 📊 Dashboard for status tracking, preview, and analytics
- ⏱️ Simulated real-time processing queue with progress tracking
- 💡 Format-wise optimization tips and performance metrics

---

## 🖼️ Screenshots

| Upload Options | Output Formats |
|----------------|----------------|
| (https://images.pexels.com/photos/3184287/pexels-pho<img width="918" alt="Screenshot 2025-06-13 at 10 33 22 PM" src="https://github.com/user-attachments/assets/90151000-a752-4687-a8bb-be1631d05a7d" />
<img width="1279" alt="Screenshot 2025-06-13 at 10 58 24 PM" src="https://github.com/user-attachments/assets/079fb357-69e0-4450-a4b2-3f81a1ee9114" />
<img width="1280" alt="Screenshot 2025-06-13 at 10 58 34 PM" src="https://github.com/user-attachments/assets/780eddc7-55e3-4492-bb98-5a32beb60e55" />
<img width="1280" alt="Screenshot 2025-06-13 at 10 58 42 PM" src="https://github.com/user-attachments/assets/10679ee2-c097-43f5-83e8-47c5a8742732" />
<img width="1280" alt="Screenshot 2025-06-13 at 10 58 49 PM" src="https://github.com/user-attachments/assets/2653fff6-c4b1-462f-abef-1ea87de1d322" />
<img width="1280" alt="Screenshot 2025-06-13 at 10 59 01 PM" src="https://github.com/user-attachments/assets/fa375747-e26a-4dc2-861f-df19649691d9" />
to-3184287.jpeg?auto=compress&cs=tinysrgb&w=500&h=300) |

---

## ⚙️ Tech Stack

| Tech | Description |
|------|-------------|
| React.js | Frontend framework |
| Tailwind CSS | UI styling |
| Framer Motion | Page transitions |
| JavaScript | Core logic |
| Local State | For tab and job management |

---

## 📁 Folder Structure


📦src
┣ 📂components
┃ ┣ 📄Header.jsx
┃ ┣ 📄ContentUpload.jsx
┃ ┣ 📄Dashboard.jsx
┃ ┣ 📄ProcessingQueue.jsx
┃ ┣ 📄ContentPreview.jsx
┃ ┗ 📄Analytics.jsx
┣ 📄App.js
┗ 📄index.js



---

## 🧠 How It Works

1. **Content Upload**  
   Users upload a file or enter a URL/text input.

2. **Processing Queue**  
   Simulates platform-specific processing jobs using progress bars and intervals.

3. **Multi-Format Generation**  
   Generates mock content for:
   - Instagram Reel
   - YouTube Shorts
   - TikTok
   - Blog post
   - Twitter thread
   - LinkedIn post
   - Podcast audio
   - Instagram Story

4. **Preview + Analytics**  
   Previews thumbnails, format stats, and mock engagement metrics.

---

## 🔧 Setup & Run Locally

### Prerequisites
- Node.js ≥ 14.x
- npm or yarn

### Steps

```bash
git clone https://github.com/your-username/contentflow.git
cd contentflow
npm install
npm run dev 
