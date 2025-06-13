import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import ContentUpload from './components/ContentUpload';
import Dashboard from './components/Dashboard';
import ProcessingQueue from './components/ProcessingQueue';
import ContentPreview from './components/ContentPreview';
import Analytics from './components/Analytics';

function App() {
  const [activeTab, setActiveTab] = useState('upload');
  const [projects, setProjects] = useState([]);
  const [processingJobs, setProcessingJobs] = useState([]);

  const handleContentUpload = (content) => {
    const newProject = {
      id: Date.now(),
      ...content,
      status: 'processing',
      createdAt: new Date(),
      formats: []
    };
    
    setProjects(prev => [newProject, ...prev]);
    
    // Simulate processing jobs
    const jobs = [
      { id: `${newProject.id}-instagram-reel`, platform: 'Instagram Reel', status: 'processing', progress: 0 },
      { id: `${newProject.id}-youtube-shorts`, platform: 'YouTube Shorts', status: 'queued', progress: 0 },
      { id: `${newProject.id}-tiktok`, platform: 'TikTok', status: 'queued', progress: 0 },
      { id: `${newProject.id}-linkedin-post`, platform: 'LinkedIn Post', status: 'queued', progress: 0 },
      { id: `${newProject.id}-twitter-thread`, platform: 'Twitter Thread', status: 'queued', progress: 0 },
      { id: `${newProject.id}-blog-post`, platform: 'Blog Post', status: 'queued', progress: 0 },
      { id: `${newProject.id}-podcast-clip`, platform: 'Podcast Clip', status: 'queued', progress: 0 },
      { id: `${newProject.id}-instagram-story`, platform: 'Instagram Story', status: 'queued', progress: 0 }
    ];
    
    setProcessingJobs(prev => [...prev, ...jobs]);
    
    // Simulate processing completion
    setTimeout(() => {
      simulateProcessingCompletion(newProject.id, jobs);
    }, 1000);
  };

  const simulateProcessingCompletion = (projectId, jobs) => {
    let completedJobs = 0;
    const totalJobs = jobs.length;
    
    const processJob = (jobIndex) => {
      if (jobIndex >= totalJobs) return;
      
      const job = jobs[jobIndex];
      const progressInterval = setInterval(() => {
        setProcessingJobs(prev => 
          prev.map(j => 
            j.id === job.id 
              ? { ...j, status: 'processing', progress: Math.min(j.progress + 10, 100) }
              : j
          )
        );
      }, 200);
      
      setTimeout(() => {
        clearInterval(progressInterval);
        setProcessingJobs(prev => 
          prev.map(j => 
            j.id === job.id 
              ? { ...j, status: 'completed', progress: 100 }
              : j
          )
        );
        
        completedJobs++;
        if (completedJobs === totalJobs) {
          setProjects(prev => 
            prev.map(p => 
              p.id === projectId 
                ? { ...p, status: 'completed', formats: generateMockFormats() }
                : p
            )
          );
        }
        
        setTimeout(() => processJob(jobIndex + 1), 500);
      }, 2000 + Math.random() * 2000);
    };
    
    processJob(0);
  };

  const generateMockFormats = () => [
    {
      platform: 'Instagram Reel',
      format: 'MP4 (9:16)',
      size: '2.1 MB',
      duration: '30s',
      preview: 'https://images.pexels.com/photos/3586966/pexels-photo-3586966.jpeg?auto=compress&cs=tinysrgb&w=300&h=533',
      engagement: '+45%',
      optimizations: ['Vertical format', 'Trending audio', 'Captions added']
    },
    {
      platform: 'YouTube Shorts',
      format: 'MP4 (9:16)',
      size: '3.2 MB',
      duration: '45s',
      preview: 'https://images.pexels.com/photos/3586966/pexels-photo-3586966.jpeg?auto=compress&cs=tinysrgb&w=300&h=533',
      engagement: '+38%',
      optimizations: ['Hook in first 3s', 'End screen CTA', 'Chapters added']
    },
    {
      platform: 'TikTok',
      format: 'MP4 (9:16)',
      size: '1.8 MB',
      duration: '28s',
      preview: 'https://images.pexels.com/photos/3586966/pexels-photo-3586966.jpeg?auto=compress&cs=tinysrgb&w=300&h=533',
      engagement: '+52%',
      optimizations: ['Trending hashtags', 'Fast-paced editing', 'Text overlay']
    },
    {
      platform: 'LinkedIn Post',
      format: 'Article + Image',
      size: '1.2 MB',
      wordCount: '450 words',
      preview: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=500&h=300',
      engagement: '+28%',
      optimizations: ['Professional tone', 'Industry keywords', 'Call to action']
    },
    {
      platform: 'Twitter Thread',
      format: '8 Tweets',
      size: '2.4 KB',
      tweets: 8,
      preview: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=500&h=300',
      engagement: '+31%',
      optimizations: ['Thread hooks', 'Engaging visuals', 'Retweet prompts']
    },
    {
      platform: 'Blog Post',
      format: 'HTML Article',
      size: '15 KB',
      wordCount: '1,200 words',
      preview: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=500&h=300',
      engagement: '+19%',
      optimizations: ['SEO optimized', 'Meta descriptions', 'Internal links']
    },
    {
      platform: 'Podcast Clip',
      format: 'MP3 Audio',
      size: '4.1 MB',
      duration: '3m 15s',
      preview: 'https://images.pexels.com/photos/3784424/pexels-photo-3784424.jpeg?auto=compress&cs=tinysrgb&w=500&h=300',
      engagement: '+41%',
      optimizations: ['Audio quality enhanced', 'Intro/outro added', 'Noise reduction']
    },
    {
      platform: 'Instagram Story',
      format: 'MP4 Stories (9:16)',
      size: '1.9 MB',
      duration: '15s',
      preview: 'https://images.pexels.com/photos/3586966/pexels-photo-3586966.jpeg?auto=compress&cs=tinysrgb&w=300&h=533',
      engagement: '+33%',
      optimizations: ['Interactive stickers', 'Swipe-up CTA', 'Brand colors']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2220%22 height=%2220%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cdefs%3E%3Cpattern id=%22grid%22 width=%2220%22 height=%2220%22 patternUnits=%22userSpaceOnUse%22%3E%3Cpath d=%22M 20 0 L 0 0 0 20%22 fill=%22none%22 stroke=%22%23ffffff%22 stroke-width=%220.5%22 opacity=%220.1%22/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=%22100%25%22 height=%22100%25%22 fill=%22url(%23grid)%22/%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="relative z-10">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="container mx-auto px-6 py-8">
          <AnimatePresence mode="wait">
            {activeTab === 'upload' && (
              <motion.div
                key="upload"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ContentUpload onUpload={handleContentUpload} />
              </motion.div>
            )}
            
            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Dashboard projects={projects} />
              </motion.div>
            )}
            
            {activeTab === 'processing' && (
              <motion.div
                key="processing"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ProcessingQueue jobs={processingJobs} />
              </motion.div>
            )}
            
            {activeTab === 'preview' && (
              <motion.div
                key="preview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ContentPreview projects={projects} />
              </motion.div>
            )}
            
            {activeTab === 'analytics' && (
              <motion.div
                key="analytics"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Analytics projects={projects} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default App;