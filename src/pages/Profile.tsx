import React from 'react';

const Profile: React.FC = () => {
  // 模拟用户数据
  const userData = {
    name: '用户名',
    role: 'Python数据分析学习者',
    completedProjects: 5,
    totalProjects: 10,
    learningHours: 12,
    skillMastery: 65,
    recentActivities: [
      {
        id: 1,
        type: '项目完成',
        content: '完成了"基础数据清洗与分析"项目',
        time: '2小时前'
      },
      {
        id: 2,
        type: '学习活动',
        content: '学习了"数据可视化"章节',
        time: '昨天'
      },
      {
        id: 3,
        type: '技能提升',
        content: '掌握了pandas库的基本操作',
        time: '3天前'
      }
    ],
    recommendedPath: [
      {
        id: 1,
        title: '数据可视化进阶',
        description: '学习Matplotlib和Seaborn库的高级用法',
        difficulty: '中等',
        status: '推荐'
      },
      {
        id: 2,
        title: '统计分析基础',
        description: '学习统计推断和假设检验',
        difficulty: '入门',
        status: '进行中'
      },
      {
        id: 3,
        title: '机器学习入门',
        description: '学习scikit-learn库的基本用法',
        difficulty: '高级',
        status: '计划中'
      }
    ]
  };

  return (
    <div className="space-y-8">
      {/* 用户信息卡片 */}
      <div className="bg-white rounded-lg shadow-card p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
          <div className="h-24 w-24 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-primary-600 font-bold text-3xl">{userData.name.charAt(0)}</span>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">{userData.name}</h2>
            <p className="text-gray-600 mb-4">{userData.role}</p>
            <div className="flex flex-wrap gap-3">
              <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                编辑资料
              </button>
              <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
                学习设置
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* 学习概览 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-card p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">已完成项目</h3>
            <span className="text-sm text-gray-500">{userData.completedProjects}/{userData.totalProjects}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
            <div 
              className="bg-primary-600 h-2.5 rounded-full" 
              style={{ width: `${(userData.completedProjects / userData.totalProjects) * 100}%` }}
            ></div>
          </div>
          <p className="text-3xl font-bold text-primary-600">{userData.completedProjects}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-card p-6">
          <h3 className="text-lg font-semibold mb-2">学习时长</h3>
          <p className="text-3xl font-bold text-primary-600">{userData.learningHours}小时</p>
          <p className="text-sm text-gray-500 mt-1">本周学习 3 小时</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-card p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">技能掌握</h3>
            <span className="text-sm text-gray-500">{userData.skillMastery}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
            <div 
              className="bg-primary-600 h-2.5 rounded-full" 
              style={{ width: `${userData.skillMastery}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>基础</span>
            <span>进阶</span>
            <span>高级</span>
          </div>
        </div>
      </div>
      
      {/* 最近活动 */}
      <div className="bg-white rounded-lg shadow-card p-6">
        <h3 className="text-lg font-semibold mb-4">最近活动</h3>
        <div className="space-y-4">
          {userData.recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-medium">{activity.type}</p>
                <p className="text-gray-600">{activity.content}</p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* 推荐学习路径 */}
      <div className="bg-white rounded-lg shadow-card p-6">
        <h3 className="text-lg font-semibold mb-4">推荐学习路径</h3>
        <div className="space-y-4">
          {userData.recommendedPath.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div>
                <h4 className="font-medium">{item.title}</h4>
                <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.difficulty === '入门' ? 'bg-green-100 text-green-800' : item.difficulty === '中等' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                    {item.difficulty}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === '推荐' ? 'bg-blue-100 text-blue-800' : item.status === '进行中' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}>
                    {item.status}
                  </span>
                </div>
              </div>
              <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                开始学习
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;