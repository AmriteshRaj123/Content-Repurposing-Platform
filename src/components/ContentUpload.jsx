import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { Upload, Video, Music, FileText, Link, Sparkles, CheckCircle, Camera, Mic, Type } from 'lucide-react';

const ContentUpload = ({ onUpload }) => {
  const [uploadType, setUploadType] = useState('file');
  const [urlInput, setUrlInput] = useState('');
  const [textInput, setTextInput] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    accept: {
      'video/*': ['.mp4', '.avi', '.mov', '.wmv'],
      'audio/*': ['.mp3', '.wav', '.m4a'],
      'text/*': ['.txt', '.md', '.docx']
    },
    maxFiles: 1,
    onDrop: (files) => {
      if (files.length > 0) {
        handleFileUpload(files[0]);
      }
    }
  });

  const handleFileUpload = async (file) => {
    setIsUploading(true);
    
    // Simulate upload processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const contentData = {
      type: 'file',
      file: {
        name: file.name,
        size: file.size,
        type: file.type,
        preview: URL.createObjectURL(file)
      },
      title: file.name.split('.')[0],
      description: `Uploaded ${file.type.split('/')[0]} content`
    };
    
    onUpload(contentData);
    setIsUploading(false);
  };

  const handleUrlSubmit = async () => {
    if (!urlInput.trim()) return;
    
    setIsUploading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const contentData = {
      type: 'url',
      url: urlInput,
      title: 'URL Content',
      description: `Content extracted from ${new URL(urlInput).hostname}`
    };
    
    onUpload(contentData);
    setIsUploading(false);
    setUrlInput('');
  };

  const handleTextSubmit = async () => {
    if (!textInput.trim()) return;
    
    setIsUploading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const contentData = {
      type: 'text',
      content: textInput,
      title: 'Text Content',
      description: `${textInput.split(' ').length} words of text content`
    };
    
    onUpload(contentData);
    setIsUploading(false);
    setTextInput('');
  };

  const uploadOptions = [
    { 
      id: 'file', 
      label: 'Upload File', 
      icon: Upload, 
      description: 'Video, audio, or document files',
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      id: 'url', 
      label: 'From URL', 
      icon: Link, 
      description: 'YouTube, Vimeo, or web content',
      color: 'from-green-500 to-emerald-500'
    },
    { 
      id: 'text', 
      label: 'Text Input', 
      icon: Type, 
      description: 'Paste or type your content',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      <motion.div 
        className="text-center px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
          <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">Transform Your Content</h2>
        <p className="text-base sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
          Upload once, reach everywhere. Our AI automatically repurposes your content into 8+ formats optimized for different platforms.
        </p>
      </motion.div>

      {/* Upload Type Selection */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {uploadOptions.map((option) => {
          const Icon = option.icon;
          return (
            <motion.button
              key={option.id}
              onClick={() => setUploadType(option.id)}
              className={`p-4 sm:p-6 rounded-2xl border-2 transition-all duration-300 ${
                uploadType === option.id
                  ? 'bg-white/20 border-white/40 backdrop-blur-md shadow-lg'
                  : 'bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/30'
              }`}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${option.color} rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4`}>
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">{option.label}</h3>
              <p className="text-sm sm:text-base text-white/70">{option.description}</p>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Upload Interface */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-white/10 backdrop-blur-md rounded-3xl p-4 sm:p-8 border border-white/20 mx-4"
      >
        {uploadType === 'file' && (
          <div {...getRootProps()} className={`border-2 border-dashed rounded-2xl p-6 sm:p-12 text-center cursor-pointer transition-all duration-300 ${
            isDragActive ? 'border-purple-400 bg-purple-400/10' : 'border-white/30 hover:border-white/50'
          }`}>
            <input {...getInputProps()} />
            {isUploading ? (
              <div className="space-y-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto animate-pulse">
                  <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <p className="text-white text-base sm:text-lg">Processing your content...</p>
                <div className="w-48 sm:w-64 h-2 bg-white/20 rounded-full mx-auto overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            ) : acceptedFiles.length > 0 ? (
              <div className="space-y-4">
                <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-green-400 mx-auto" />
                <p className="text-white text-base sm:text-lg">Ready to process: {acceptedFiles[0].name}</p>
                <button
                  onClick={() => handleFileUpload(acceptedFiles[0])}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 text-sm sm:text-base"
                >
                  Start Processing
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto">
                  <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-white/70" />
                </div>
                <div>
                  <p className="text-white text-base sm:text-lg mb-2">
                    {isDragActive ? 'Drop your file here' : 'Drag & drop your content here'}
                  </p>
                  <p className="text-white/70 text-sm sm:text-base">
                    Supports video (MP4, AVI, MOV), audio (MP3, WAV), and text files
                  </p>
                </div>
                <button className="bg-white/20 text-white px-4 sm:px-6 py-2 rounded-xl hover:bg-white/30 transition-all duration-200 text-sm sm:text-base">
                  Choose File
                </button>
              </div>
            )}
          </div>
        )}

        {uploadType === 'url' && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Link className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Import from URL</h3>
              <p className="text-white/70 text-sm sm:text-base">Paste a YouTube, Vimeo, or web page URL</p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="flex-1 bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/20 text-sm sm:text-base"
                disabled={isUploading}
              />
              <button
                onClick={handleUrlSubmit}
                disabled={!urlInput.trim() || isUploading}
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 sm:px-8 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {isUploading ? 'Processing...' : 'Import'}
              </button>
            </div>
          </div>
        )}

        {uploadType === 'text' && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Type className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Text Content</h3>
              <p className="text-white/70 text-sm sm:text-base">Paste your article, script, or any text content</p>
            </div>
            <textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Paste your content here..."
              rows={6}
              className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/20 resize-none text-sm sm:text-base"
              disabled={isUploading}
            />
            <div className="flex justify-between items-center">
              <p className="text-white/70 text-xs sm:text-sm">
                {textInput.split(' ').filter(word => word.length > 0).length} words
              </p>
              <button
                onClick={handleTextSubmit}
                disabled={!textInput.trim() || isUploading}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {isUploading ? 'Processing...' : 'Process Text'}
              </button>
            </div>
          </div>
        )}
      </motion.div>

      {/* Features Preview */}
      <motion.div 
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        {[
          { icon: Camera, label: 'Video Clips', count: '3 formats', color: 'text-red-400' },
          { icon: Mic, label: 'Audio Snippets', count: '2 formats', color: 'text-green-400' },
          { icon: FileText, label: 'Written Content', count: '2 formats', color: 'text-blue-400' },
          { icon: Sparkles, label: 'Social Posts', count: '1 format', color: 'text-purple-400' }
        ].map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div key={index} className="bg-white/5 rounded-2xl p-3 sm:p-6 text-center border border-white/10">
              <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${feature.color} mx-auto mb-2 sm:mb-3`} />
              <h4 className="text-white font-semibold mb-1 text-sm sm:text-base">{feature.label}</h4>
              <p className="text-white/60 text-xs sm:text-sm">{feature.count}</p>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default ContentUpload;