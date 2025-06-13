import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, Users, Eye, Heart, Share2, Target } from 'lucide-react';

const Analytics = ({ projects }) => {
  const completedProjects = projects.filter(p => p.status === 'completed' && p.formats?.length > 0);

  // Mock analytics data
  const platformData = [
    { name: 'Instagram Reel', value: 45, color: '#E1306C' },
    { name: 'YouTube Shorts', value: 38, color: '#FF0000' },
    { name: 'TikTok', value: 52, color: '#000000' },
    { name: 'LinkedIn', value: 28, color: '#0A66C2' },
    { name: 'Twitter', value: 31, color: '#1DA1F2' },
    { name: 'Blog Post', value: 19, color: '#00A86B' },
    { name: 'Podcast', value: 41, color: '#9146FF' },
    { name: 'Instagram Story', value: 33, color: '#833AB4' }
  ];

  const engagementData = [
    { month: 'Jan', views: 12000, likes: 1800, shares: 450 },
    { month: 'Feb', views: 18000, likes: 2400, shares: 680 },
    { month: 'Mar', views: 25000, likes: 3200, shares: 920 },
    { month: 'Apr', views: 32000, likes: 4100, shares: 1200 },
    { month: 'May', views: 41000, likes: 5300, shares: 1580 },
    { month: 'Jun', views: 52000, likes: 6800, shares: 2100 }
  ];

  const roiData = [
    { platform: 'Instagram', cost: 500, revenue: 2400, roi: 380 },
    { platform: 'YouTube', cost: 300, revenue: 1800, roi: 500 },
    { platform: 'TikTok', cost: 200, revenue: 1500, roi: 650 },
    { platform: 'LinkedIn', cost: 400, revenue: 1200, roi: 200 },
    { platform: 'Twitter', cost: 150, revenue: 800, roi: 433 }
  ];

  const stats = [
    { 
      label: 'Total Views', 
      value: '2.1M', 
      change: '+23%', 
      icon: Eye, 
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10'
    },
    { 
      label: 'Engagement Rate', 
      value: '8.4%', 
      change: '+12%', 
      icon: Heart, 
      color: 'text-pink-400',
      bgColor: 'bg-pink-400/10'
    },
    { 
      label: 'Total Shares', 
      value: '45.2K', 
      change: '+34%', 
      icon: Share2, 
      color: 'text-green-400',
      bgColor: 'bg-green-400/10'
    },
    { 
      label: 'Conversion Rate', 
      value: '3.2%', 
      change: '+18%', 
      icon: Target, 
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10'
    }
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h2>
        <p className="text-white/70">Track performance and ROI across all your repurposed content</p>
      </motion.div>

      {/* Key Metrics */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <span className="text-green-400 text-sm font-medium">{stat.change}</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                <p className="text-white/70">{stat.label}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Platform Performance */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
        >
          <h3 className="text-xl font-bold text-white mb-6">Platform Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={platformData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.7)' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0,0,0,0.8)', 
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '12px'
                }}
              />
              <Bar dataKey="value" fill="url(#gradient)" radius={[4, 4, 0, 0]} />
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Content Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
        >
          <h3 className="text-xl font-bold text-white mb-6">Content Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={platformData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {platformData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0,0,0,0.8)', 
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '12px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Engagement Trends */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
      >
        <h3 className="text-xl font-bold text-white mb-6">Engagement Trends</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={engagementData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.7)' }} />
            <YAxis tick={{ fill: 'rgba(255,255,255,0.7)' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(0,0,0,0.8)', 
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '12px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="views" 
              stroke="#3B82F6" 
              strokeWidth={3}
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="likes" 
              stroke="#EC4899" 
              strokeWidth={3}
              dot={{ fill: '#EC4899', strokeWidth: 2, r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="shares" 
              stroke="#10B981" 
              strokeWidth={3}
              dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* ROI Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
      >
        <h3 className="text-xl font-bold text-white mb-6">ROI Analysis</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-white/70 text-left">
                <th className="pb-4">Platform</th>
                <th className="pb-4">Investment</th>
                <th className="pb-4">Revenue</th>
                <th className="pb-4">ROI</th>
                <th className="pb-4">Performance</th>
              </tr>
            </thead>
            <tbody className="space-y-2">
              {roiData.map((item, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="text-white border-t border-white/10"
                >
                  <td className="py-4 font-semibold">{item.platform}</td>
                  <td className="py-4 text-white/70">${item.cost}</td>
                  <td className="py-4 text-green-400">${item.revenue}</td>
                  <td className="py-4">
                    <span className="text-green-400 font-semibold">+{item.roi}%</span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-20 h-2 bg-white/20 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                          style={{ width: `${Math.min(item.roi / 10, 100)}%` }}
                        />
                      </div>
                      <TrendingUp className="w-4 h-4 text-green-400" />
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl p-6">
          <h4 className="text-green-400 font-semibold mb-2">Total ROI</h4>
          <p className="text-3xl font-bold text-white">+342%</p>
          <p className="text-green-400 text-sm mt-2">↗ +23% from last month</p>
        </div>
        
        <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-2xl p-6">
          <h4 className="text-blue-400 font-semibold mb-2">Content Reach</h4>
          <p className="text-3xl font-bold text-white">2.1M</p>
          <p className="text-blue-400 text-sm mt-2">↗ +18% from last month</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl p-6">
          <h4 className="text-purple-400 font-semibold mb-2">Time Saved</h4>
          <p className="text-3xl font-bold text-white">147 hrs</p>
          <p className="text-purple-400 text-sm mt-2">↗ +41% efficiency gain</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Analytics;