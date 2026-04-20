import React from 'react';

const Learning: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">学习引导</h2>
        <p className="text-gray-600">通过3步认知，建立完整的数据分析思维体系</p>
      </div>

      {/* 3步认知 */}
      <div className="space-y-8">
        {/* 第一步：思维模型 */}
        <div className="bg-white rounded-lg shadow-card p-6">
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 bg-primary-600 text-white rounded-full flex items-center justify-center mr-4">
              <span className="font-bold">1</span>
            </div>
            <h3 className="text-xl font-semibold">第一步：思维模型</h3>
          </div>
          <div className="pl-14 space-y-4">
            <p className="text-gray-600">
              建立正确的数据分析思维模型，理解数据分析的核心概念和方法论，为后续的项目实践打下基础。
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                数据思维：从数据中发现问题和机会
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                统计思维：理解数据的分布和规律
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                业务思维：将数据分析与业务需求结合
              </li>
            </ul>
          </div>
        </div>

        {/* 第二步：行业争议 */}
        <div className="bg-white rounded-lg shadow-card p-6">
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 bg-primary-600 text-white rounded-full flex items-center justify-center mr-4">
              <span className="font-bold">2</span>
            </div>
            <h3 className="text-xl font-semibold">第二步：行业争议</h3>
          </div>
          <div className="pl-14 space-y-4">
            <p className="text-gray-600">
              了解数据分析领域的常见争议和误区，培养批判性思维，避免在实践中走弯路。
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                数据驱动 vs 经验驱动
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                统计显著性 vs 实际意义
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                模型复杂度 vs 可解释性
              </li>
            </ul>
          </div>
        </div>

        {/* 第三步：辨析题 */}
        <div className="bg-white rounded-lg shadow-card p-6">
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 bg-primary-600 text-white rounded-full flex items-center justify-center mr-4">
              <span className="font-bold">3</span>
            </div>
            <h3 className="text-xl font-semibold">第三步：辨析题</h3>
          </div>
          <div className="pl-14 space-y-4">
            <p className="text-gray-600">
              通过实际辨析题，检验你的理解程度，发现知识盲点，加深对数据分析概念的理解。
            </p>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="font-medium mb-2">辨析题示例：</h4>
              <p className="mb-4">Q: 相关关系等于因果关系吗？</p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="radio" id="option1" name="question1" className="mr-2" />
                  <label htmlFor="option1">是，相关关系就是因果关系</label>
                </div>
                <div className="flex items-center">
                  <input type="radio" id="option2" name="question1" className="mr-2" />
                  <label htmlFor="option2">否，相关关系不代表因果关系</label>
                </div>
                <div className="flex items-center">
                  <input type="radio" id="option3" name="question1" className="mr-2" />
                  <label htmlFor="option3">不一定，需要具体分析</label>
                </div>
              </div>
              <button className="mt-4 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                提交答案
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learning;