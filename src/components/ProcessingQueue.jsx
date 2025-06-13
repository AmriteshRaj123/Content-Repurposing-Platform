import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, CheckCircle, Zap, AlertCircle, Play, Pause } from 'lucide-react';

const ProcessingQueue = ({ jobs }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />;
      case 'processing':
        return <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 animate-pulse" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />;
      default:
        return <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-white/50" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'border-green-400/30 bg-green-400/10';
      case 'processing':
        return 'border-yellow-400/30 bg-yellow-400/10';
      case 'failed':
        return 'border-red-400/30 bg-red-400/10';
      default:
        return 'border-white/20 bg-white/5';
    }
  };

  const activeJobs = jobs.filter(job => job.status !== 'completed');
  const completedJobs = jobs.filter(job => job.status === 'completed');

  const stats = [
    { label: 'Total Jobs', value: jobs.length, icon: Play, color: 'text-blue-400' },
    { label: 'Processing', value: jobs.filter(j => j.status === 'processing').length, icon: Zap, color: 'text-yellow-400' },
    { label: 'Completed', value: completedJobs.length, icon: CheckCircle, color: 'text-green-400' },
    { label: 'Queued', value: jobs.filter(j => j.status === 'queued').length, icon: Clock, color: 'text-white/70' }
  ];

  return (
    <div className="space-y-6 sm:space-y-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center sm:text-left"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Processing Queue</h2>
        <p className="text-white/70 text-sm sm:text-base">Monitor your content transformation jobs in real-time</p>
      </motion.div>

      {/* Queue Stats */}
      <motion.div 
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color}`} />
                <span className="text-lg sm:text-2xl font-bold text-white">{stat.value}</span>
              </div>
              <p className="text-white/70 font-medium text-xs sm:text-sm">{stat.label}</p>
            </div>
          );
        })}
      </motion.div>

      {jobs.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white/5 rounded-2xl p-8 sm:p-12 text-center border border-white/10"
        >
          <Clock className="w-10 h-10 sm:w-12 sm:h-12 text-white/30 mx-auto mb-4" />
          <h4 className="text-lg sm:text-xl font-semibold text-white/70 mb-2">No jobs in queue</h4>
          <p className="text-white/50 text-sm sm:text-base">Upload content to start processing jobs</p>
        </motion.div>
      ) : (
        <div className="space-y-6">
          {/* Active Jobs */}
          {activeJobs.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Active Jobs</h3>
              <div className="space-y-3">
                <AnimatePresence>
                  {activeJobs.map((job, index) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={`p-4 sm:p-4 rounded-2xl border backdrop-blur-md ${getStatusColor(job.status)}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                          {getStatusIcon(job.status)}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-white font-semibold text-sm sm:text-base truncate">{job.platform}</h4>
                            <p className="text-white/70 text-xs sm:text-sm capitalize">{job.status}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
                          {job.status === 'processing' && (
                            <div className="flex items-center space-x-2 sm:space-x-3">
                              <div className="w-16 sm:w-32 h-2 bg-white/20 rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${job.progress}%` }}
                                  transition={{ duration: 0.5 }}
                                />
                              </div>
                              <span className="text-white/70 text-xs sm:text-sm font-medium min-w-[2rem]">
                                {job.progress}%
                              </span>
                            </div>
                          )}
                          {job.status === 'queued' && (
                            <span className="text-white/50 text-xs sm:text-sm">Waiting...</span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* Completed Jobs */}
          {completedJobs.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Completed Jobs</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {completedJobs.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-green-400/10 border border-green-400/30 rounded-2xl p-3 sm:p-4 backdrop-blur-md"
                  >
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-semibold text-sm sm:text-base truncate">{job.platform}</h4>
                        <p className="text-green-400 text-xs sm:text-sm">Complete</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProcessingQueue;