import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="space-y-16">
      {/* 英雄区域 */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl p-8 md:p-12 shadow-lg">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Python数据分析AI训练平台</h2>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            基于Cloudflare免费资源，实现“3步认知+10个梯度项目+AI错题倒逼”的Python数据分析实操训练，
            零成本、零运维、无传统后端，打开浏览器即可使用。
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="/projects" className="bg-white text-primary-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              开始学习
            </a>
            <a href="/learning" className="bg-transparent border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors">
              学习引导
            </a>
          </div>
        </div>
      </section>

      {/* 核心功能 */}
      <section>
        <h2 className="text-2xl font-bold mb-8 text-center">核心功能</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 3步认知 */}
          <div className="bg-white p-6 rounded-lg shadow-card hover:shadow-card-hover transition-shadow">
            <div className="h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-primary-600 font-bold text-xl">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">3步认知</h3>
            <p className="text-gray-600">
              从底层思维模型到行业争议，建立完整的数据分析认知体系，为实操项目打下坚实基础。
            </p>
          </div>

          {/* 10个梯度项目 */}
          <div className="bg-white p-6 rounded-lg shadow-card hover:shadow-card-hover transition-shadow">
            <div className="h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-primary-600 font-bold text-xl">10</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">10个梯度项目</h3>
            <p className="text-gray-600">
              从基础到进阶，覆盖数据清洗、可视化、建模等核心技能，循序渐进提升数据分析能力。
            </p>
          </div>

          {/* AI错题倒逼 */}
          <div className="bg-white p-6 rounded-lg shadow-card hover:shadow-card-hover transition-shadow">
            <div className="h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">AI错题倒逼</h3>
            <p className="text-gray-600">
              智能AI陪练，通过错题追问和思路引导，帮助你深入理解数据分析原理和方法。
            </p>
          </div>
        </div>
      </section>

      {/* 技术特点 */}
      <section className="bg-gray-50 rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-8 text-center">技术特点</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-card">
            <h3 className="text-lg font-semibold mb-3">无后端架构</h3>
            <p className="text-gray-600 mb-4">
              基于Cloudflare Pages和Workers，无需传统后端服务器，零成本部署和运维。
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                浏览器端Python运行（Pyodide）
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Cloudflare Workers AI代理
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                LocalStorage本地存储
              </li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-card">
            <h3 className="text-lg font-semibold mb-3">免费资源</h3>
            <p className="text-gray-600 mb-4">
              完全基于Cloudflare免费套餐，不使用任何付费服务，降低学习门槛。
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Cloudflare Pages（无限站点）
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Workers（每天10万次请求）
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Workers KV（1GB存储）
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 项目预览 */}
      <section>
        <h2 className="text-2xl font-bold mb-8 text-center">项目预览</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-card hover:shadow-card-hover transition-shadow overflow-hidden">
              <div className="h-40 bg-primary-100 flex items-center justify-center">
                <span className="text-primary-600 font-bold text-xl">项目 {i}</span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">基础数据清洗与分析</h3>
                <p className="text-gray-600 mb-4">
                  学习使用pandas进行数据清洗、处理和基本分析，掌握数据分析的核心技能。
                </p>
                <a href={`/projects/${i}`} className="text-primary-600 hover:text-primary-700 font-medium flex items-center">
                  查看详情
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;