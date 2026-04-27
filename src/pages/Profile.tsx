import React from 'react';

const Profile: React.FC = () => {
  // 模拟用户数据
  const userData = {
    name: '数据分析学习者',
    role: 'Python数据分析爱好者',
    avatar: 'https://api.dicebear.com/7.x/lorelei/svg?seed=profile',
    completedProjects: 3,
    learningHours: 15,
    skillMastery: 65,
    recentActivities: [
      {
        id: 1,
        type: '项目完成',
        description: '完成了基础数据清洗与分析项目',
        date: '2026-04-20'
      },
      {
        id: 2,
        type: '学习活动',
        description: '学习了数据可视化入门课程',
        date: '2026-04-18'
      },
      {
        id: 3,
        type: '技能提升',
        description: '掌握了pandas基础操作',
        date: '2026-04-15'
      }
    ],
    recommendedPath: [
      {
        id: 1,
        title: '统计分析基础',
        difficulty: '初级',
        status: '未开始',
        progress: 0
      },
      {
        id: 2,
        title: '回归分析实践',
        difficulty: '中级',
        status: '未开始',
        progress: 0
      },
      {
        id: 3,
        title: '分类算法应用',
        difficulty: '中级',
        status: '未开始',
        progress: 0
      }
    ]
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case '初级': return 'bg-green-100 text-green-800';
      case '中级': return 'bg-blue-100 text-blue-800';
      case '高级': return 'bg-purple-100 text-purple-800';
      case '专家': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case '已完成': return 'bg-green-100 text-green-800';
      case '进行中': return 'bg-blue-100 text-blue-800';
      case '未开始': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* 用户信息卡片 */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex-shrink-0">
            <img 
              src={userData.avatar} 
              alt="用户头像" 
              className="h-24 w-24 rounded-full object-cover border-4 border-primary-100"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold text-gray-900">{userData.name}</h2>
            <p className="text-gray-600 mt-1">{userData.role}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                编辑资料
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                学习设置
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 学习概览 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{userData.completedProjects}</h3>
              <p className="text-gray-600 text-sm">已完成项目</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{userData.learningHours}</h3>
              <p className="text-gray-600 text-sm">学习时长（小时）</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{userData.skillMastery}%</h3>
              <p className="text-gray-600 text-sm">技能掌握度</p>
            </div>
          </div>
        </div>
      </div>

      {/* 最近活动 */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">最近活动</h3>
        <div className="space-y-4">
          {userData.recentActivities.map((activity) => (
            <div key={activity.id} className="flex gap-4">
              <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-900">{activity.type}</span>
                  <span className="text-xs text-gray-500">{activity.date}</span>
                </div>
                <p className="text-gray-600 text-sm mt-1">{activity.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 推荐学习路径 */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">推荐学习路径</h3>
        <div className="space-y-4">
          {userData.recommendedPath.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex flex-wrap justify-between items-center gap-3">
                <div>
                  <h4 className="font-medium text-gray-900">{item.title}</h4>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(item.difficulty)}`}>
                      {item.difficulty}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </div>
                </div>
                <div className="w-full md:w-1/3 mt-3 md:mt-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">{item.progress}%</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full" 
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;