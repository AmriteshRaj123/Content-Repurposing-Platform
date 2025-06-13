import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Download, Share2, TrendingUp, Clock, FileText, Video, Music, Image } from 'lucide-react';

const ContentPreview = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState(null);

  const completedProjects = projects.filter(p => p.status === 'completed' && p.formats?.length > 0);

  const getPlatformIcon = (platform) => {
    if (platform.includes('Video') || platform.includes('Reel') || platform.includes('Shorts') || platform.includes('TikTok')) {
      return <Video className="w-4 h-4" />;
    }
    if (platform.includes('Podcast') || platform.includes('Audio')) {
      return <Music className="w-4 h-4" />;
    }
    if (platform.includes('Story') || platform.includes('Image')) {
      return <Image className="w-4 h-4" />;
    }
    return <FileText className="w-4 h-4" />;
  };

  const getPlatformColor = (platform) => {
    if (platform.includes('Instagram')) return 'from-pink-500 to-purple-500';
    if (platform.includes('YouTube')) return 'from-red-500 to-red-600';
    if (platform.includes('TikTok')) return 'from-black to-gray-800';
    if (platform.includes('LinkedIn')) return 'from-blue-600 to-blue-700';
    if (platform.includes('Twitter')) return 'from-blue-400 to-blue-500';
    if (platform.includes('Blog')) return 'from-green-500 to-green-600';
    if (platform.includes('Podcast')) return 'from-purple-500 to-indigo-500';
    return 'from-gray-500 to-gray-600';
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-white mb-2">Content Preview</h2>
        <p className="text-white/70">Preview and manage your repurposed content across all platforms</p>
      </motion.div>

      {completedProjects.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/5 rounded-2xl p-12 text-center border border-white/10"
        >
          <Eye className="w-12 h-12 text-white/30 mx-auto mb-4" />
          <h4 className="text-xl font-semibold text-white/70 mb-2">No content to preview</h4>
          <p className="text-white/50">Complete some content processing to see previews here</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Project List */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <h3 className="text-xl font-bold text-white mb-4">Projects</h3>
            <div className="space-y-3">
              {completedProjects.map((project, index) => (
                <motion.button
                  key={project.id}
                  onClick={() => {
                    setSelectedProject(project);
                    setSelectedFormat(null);
                  }}
                  className={`w-full p-4 rounded-2xl border transition-all duration-200 text-left ${
                    selectedProject?.id === project.id
                      ? 'bg-white/20 border-white/40'
                      : 'bg-white/5 border-white/20 hover:bg-white/10'
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <h4 className="text-white font-semibold mb-1">{project.title}</h4>
                  <p className="text-white/70 text-sm mb-2">{project.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/50 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                    <span className="bg-green-400/20 text-green-400 px-2 py-1 rounded-lg text-xs">
                      {project.formats.length} formats
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Format Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            {selectedProject ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {selectedProject.title} - Formats
                  </h3>
                  <p className="text-white/70">
                    {selectedProject.formats.length} formats generated
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedProject.formats.map((format, index) => (
                    <motion.div
                      key={index}
                      className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                        selectedFormat === format
                          ? 'bg-white/20 border-white/40'
                          : 'bg-white/10 border-white/20 hover:bg-white/15'
                      }`}
                      onClick={() => setSelectedFormat(format)}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <div className={`p-2 rounded-lg bg-gradient-to-r ${getPlatformColor(format.platform)}`}>
                            {getPlatformIcon(format.platform)}
                          </div>
                          <div>
                            <h4 className="text-white font-semibold">{format.platform}</h4>
                            <p className="text-white/70 text-sm">{format.format}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-green-400 text-sm font-medium">
                            {format.engagement}
                          </span>
                          <TrendingUp className="w-4 h-4 text-green-400" />
                        </div>
                      </div>

                      <div className="aspect-video bg-white/5 rounded-lg mb-3 overflow-hidden">
                        <img
                          src={format.preview}
                          alt={format.platform}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-white/70">Size:</span>
                          <span className="text-white">{format.size}</span>
                        </div>
                        {format.duration && (
                          <div className="flex justify-between text-sm">
                            <span className="text-white/70">Duration:</span>
                            <span className="text-white">{format.duration}</span>
                          </div>
                        )}
                        {format.wordCount && (
                          <div className="flex justify-between text-sm">
                            <span className="text-white/70">Words:</span>
                            <span className="text-white">{format.wordCount}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex space-x-2 mt-4">
                        <button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-3 rounded-lg text-sm hover:from-purple-600 hover:to-pink-600 transition-all duration-200">
                          <Download className="w-4 h-4 inline mr-1" />
                          Download
                        </button>
                        <button className="bg-white/20 text-white py-2 px-3 rounded-lg text-sm hover:bg-white/30 transition-all duration-200">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white/5 rounded-2xl p-12 text-center border border-white/10">
                <Eye className="w-12 h-12 text-white/30 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-white/70 mb-2">Select a project</h4>
                <p className="text-white/50">Choose a project from the left to preview its formats</p>
              </div>
            )}
          </motion.div>
        </div>
      )}

      {/* Format Detail Modal */}
      <AnimatePresence>
        {selectedFormat && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedFormat(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">{selectedFormat.platform}</h3>
                <button
                  onClick={() => setSelectedFormat(null)}
                  className="text-white/70 hover:text-white transition-colors duration-200"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div className="aspect-video bg-white/5 rounded-2xl overflow-hidden">
                  <img
                    src={selectedFormat.preview}
                    alt={selectedFormat.platform}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="text-white font-semibold">Specifications</h4>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className="text-white/70">Format:</span>
                        <span className="text-white">{selectedFormat.format}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Size:</span>
                        <span className="text-white">{selectedFormat.size}</span>
                      </div>
                      {selectedFormat.duration && (
                        <div className="flex justify-between">
                          <span className="text-white/70">Duration:</span>
                          <span className="text-white">{selectedFormat.duration}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-white font-semibold">Performance</h4>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className="text-white/70">Engagement:</span>
                        <span className="text-green-400 font-medium">{selectedFormat.engagement}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-2">Optimizations</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedFormat.optimizations.map((opt, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-white/10 rounded-lg text-sm text-white/80"
                      >
                        {opt}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200">
                    <Download className="w-5 h-5 inline mr-2" />
                    Download
                  </button>
                  <button className="bg-white/20 text-white py-3 px-6 rounded-xl font-semibold hover:bg-white/30 transition-all duration-200">
                    <Share2 className="w-5 h-5 inline mr-2" />
                    Share
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContentPreview;