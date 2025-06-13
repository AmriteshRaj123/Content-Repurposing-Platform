import React from 'react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { Clock, CheckCircle, Zap, Eye, TrendingUp, MoreHorizontal, FileText, Video, Music } from 'lucide-react';

const Dashboard = ({ projects }) => {
  const stats = [
    { 
      label: 'Total Projects', 
      value: projects.length, 
      icon: FileText, 
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
      change: '+12%'
    },
    { 
      label: 'Completed', 
      value: projects.filter(p => p.status === 'completed').length, 
      icon: CheckCircle, 
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
      change: '+8%'
    },
    { 
      label: 'Processing', 
      value: projects.filter(p => p.status === 'processing').length, 
      icon: Zap, 
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10',
      change: '+3%'
    },
    { 
      label: 'Total Formats', 
      value: projects.reduce((acc, p) => acc + (p.formats?.length || 0), 0), 
      icon: TrendingUp, 
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10',
      change: '+24%'
    }
  ];

  const getContentTypeIcon = (project) => {
    if (project.type === 'file') {
      if (project.file?.type?.startsWith('video')) return Video;
      if (project.file?.type?.startsWith('audio')) return Music;
    }
    return FileText;
  };

  return (
    <div className="space-y-6 sm:space-y-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center sm:text-left"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Project Dashboard</h2>
        <p className="text-white/70 text-sm sm:text-base">Manage and track your content repurposing projects</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20"
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className={`p-2 sm:p-3 rounded-xl ${stat.bgColor}`}>
                  <Icon className={`w-4 h-4 sm:w-6 sm:h-6 ${stat.color}`} />
                </div>
                <div className="text-right">
                  <span className="text-lg sm:text-2xl font-bold text-white block">{stat.value}</span>
                  <span className="text-green-400 text-xs sm:text-sm font-medium">{stat.change}</span>
                </div>
              </div>
              <p className="text-white/70 font-medium text-xs sm:text-sm">{stat.label}</p>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Projects List */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="space-y-4"
      >
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Recent Projects</h3>
        
        {projects.length === 0 ? (
          <div className="bg-white/5 rounded-2xl p-8 sm:p-12 text-center border border-white/10">
            <Eye className="w-10 h-10 sm:w-12 sm:h-12 text-white/30 mx-auto mb-4" />
            <h4 className="text-lg sm:text-xl font-semibold text-white/70 mb-2">No projects yet</h4>
            <p className="text-white/50 text-sm sm:text-base">Upload your first piece of content to get started</p>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {projects.map((project, index) => {
              const ContentIcon = getContentTypeIcon(project);
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20 hover:bg-white/15 transition-all duration-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 sm:space-x-4 flex-1">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <ContentIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-base sm:text-xl font-semibold text-white truncate">{project.title}</h4>
                        <p className="text-white/70 text-sm sm:text-base line-clamp-2">{project.description}</p>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2">
                          <span className="text-xs sm:text-sm text-white/50">
                            {formatDistanceToNow(project.createdAt, { addSuffix: true })}
                          </span>
                          <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
                            project.status === 'completed' 
                              ? 'bg-green-400/20 text-green-400' 
                              : 'bg-yellow-400/20 text-yellow-400'
                          }`}>
                            {project.status}
                          </span>
                          {project.formats && (
                            <span className="text-xs sm:text-sm text-white/50">
                              {project.formats.length} formats
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
                      {project.status === 'completed' && (
                        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
                      )}
                      {project.status === 'processing' && (
                        <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 animate-pulse" />
                      )}
                      <button className="p-1 sm:p-2 hover:bg-white/10 rounded-xl transition-colors duration-200">
                        <MoreHorizontal className="w-4 h-4 sm:w-5 sm:h-5 text-white/70" />
                      </button>
                    </div>
                  </div>
                  
                  {project.formats && project.formats.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <div className="flex flex-wrap gap-2">
                        {project.formats.slice(0, 4).map((format, formatIndex) => (
                          <span
                            key={formatIndex}
                            className="px-2 sm:px-3 py-1 bg-white/10 rounded-lg text-xs text-white/80"
                          >
                            {format.platform}
                          </span>
                        ))}
                        {project.formats.length > 4 && (
                          <span className="px-2 sm:px-3 py-1 bg-white/10 rounded-lg text-xs text-white/80">
                            +{project.formats.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;