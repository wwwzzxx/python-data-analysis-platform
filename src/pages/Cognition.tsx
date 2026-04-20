import React, { useState } from 'react';
import { saveProjectProgress, getProjectProgress } from '../utils/storage';

// 思维模型数据
const thinkingModels = [
  {
    id: 'model1',
    title: '数据思维',
    description: '从数据中发现问题和机会的能力',
    points: [
      '数据是决策的基础，不是直觉',
      '学会问正确的问题，而不是收集所有数据',
      '关注数据的质量，而不仅仅是数量',
      '理解数据的局限性，避免过度解读'
    ]
  },
  {
    id: 'model2',
    title: '统计思维',
    description: '理解数据的分布和规律的能力',
    points: [
      '区分描述性统计和推断性统计',
      '理解抽样误差和置信区间',
      '掌握假设检验的基本原理',
      '学会识别数据中的异常值和模式'
    ]
  },
  {
    id: 'model3',
    title: '业务思维',
    description: '将数据分析与业务需求结合的能力',
    points: [
      '理解业务目标和KPI',
      '识别业务问题的根本原因',
      '提供可操作的洞察和建议',
      '用业务语言解释数据分析结果'
    ]
  }
];

// 行业争议数据
const industryControversies = [
  {
    id: 'controversy1',
    title: '数据驱动 vs 经验驱动',
    description: '数据分析与行业经验的平衡',
    arguments: [
      {
        side: '数据驱动',
        points: [
          '数据提供客观的决策依据',
          '避免个人偏见和主观判断',
          '能够发现人眼难以察觉的模式',
          '基于事实而非直觉做出决策'
        ]
      },
      {
        side: '经验驱动',
        points: [
          '行业经验包含隐性知识',
          '数据可能存在偏差或过时',
          '快速决策时经验更有效',
          '理解业务 context 至关重要'
        ]
      }
    ],
    conclusion: '理想的决策过程应该是数据与经验的结合：用数据验证经验，用经验解读数据。'
  },
  {
    id: 'controversy2',
    title: '统计显著性 vs 实际意义',
    description: '学术严谨性与业务价值的权衡',
    arguments: [
      {
        side: '统计显著性',
        points: [
          '确保结果不是偶然产生的',
          '提供科学的验证方法',
          '建立可信的研究基础',
          '避免错误的结论'
        ]
      },
      {
        side: '实际意义',
        points: [
          '关注对业务的实际影响',
          '考虑成本效益分析',
          '适应快速变化的市场环境',
          '避免过度追求统计完美'
        ]
      }
    ],
    conclusion: '统计显著性是必要条件，但不是充分条件。分析时应同时考虑实际业务影响。'
  },
  {
    id: 'controversy3',
    title: '模型复杂度 vs 可解释性',
    description: '预测能力与理解能力的平衡',
    arguments: [
      {
        side: '模型复杂度',
        points: [
          '提高预测准确性',
          '捕捉复杂的非线性关系',
          '适应多样化的数据模式',
          '利用先进的算法技术'
        ]
      },
      {
        side: '可解释性',
        points: [
          '便于理解模型决策过程',
          '增强业务 stakeholder 的信任',
          '更容易发现模型缺陷',
          '符合监管要求和伦理标准'
        ]
      }
    ],
    conclusion: '根据具体应用场景选择合适的模型：高风险决策需要可解释性，预测性任务可以接受更高的复杂度。'
  }
];

// 辨析题数据
const quizQuestions = [
  {
    id: 'quiz1',
    question: '相关关系等于因果关系吗？',
    options: [
      '是，相关关系就是因果关系',
      '否，相关关系不代表因果关系',
      '不一定，需要具体分析'
    ],
    correctAnswer: 1,
    explanation: '相关关系只是说明两个变量之间存在某种关联，但并不意味着一个变量导致了另一个变量的变化。要确立因果关系，需要通过实验设计、控制变量等方法进行验证。'
  },
  {
    id: 'quiz2',
    question: '样本量越大，统计结果越可靠吗？',
    options: [
      '是，样本量越大越好',
      '否，样本质量更重要',
      '不一定，取决于研究设计'
    ],
    correctAnswer: 2,
    explanation: '样本量确实会影响统计结果的可靠性，但样本质量（代表性、无偏性）同样重要。此外，过大的样本量可能会检测到统计学上显著但实际意义不大的差异。'
  },
  {
    id: 'quiz3',
    question: '机器学习模型的准确率越高越好吗？',
    options: [
      '是，准确率是最重要的指标',
      '否，需要综合考虑多个指标',
      '不一定，取决于具体应用场景'
    ],
    correctAnswer: 2,
    explanation: '不同的应用场景对模型性能的要求不同。例如，在医疗诊断中，召回率（避免漏诊）可能比准确率更重要；在金融欺诈检测中，精确率可能更关键。'
  },
  {
    id: 'quiz4',
    question: '数据可视化越复杂越好吗？',
    options: [
      '是，复杂的可视化包含更多信息',
      '否，简洁清晰更重要',
      '不一定，取决于目标受众'
    ],
    correctAnswer: 1,
    explanation: '好的数据可视化应该是简洁明了的，能够有效传达核心信息。过于复杂的可视化会分散观众注意力，降低信息传递的效果。'
  },
  {
    id: 'quiz5',
    question: '数据分析的目的是为了证明预设的结论吗？',
    options: [
      '是，数据分析是为了验证假设',
      '否，数据分析是为了发现真相',
      '不一定，取决于研究目的'
    ],
    correctAnswer: 1,
    explanation: '数据分析的核心价值在于客观地发现数据中的模式和洞察，而不是为了证明预设的结论。带有偏见的分析可能会导致错误的决策。'
  }
];

const Cognition: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'models' | 'controversies' | 'quiz'>('models');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  // 处理辨析题答案选择
  const handleAnswerSelect = (questionId: string, optionIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  // 提交辨析题答案
  const handleSubmitQuiz = () => {
    let correctCount = 0;
    quizQuestions.forEach(question => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setShowResults(true);

    // 保存学习进度
    const progress = {
      code: '',
      completed: true,
      lastUpdated: Date.now()
    };
    saveProjectProgress('cognition-module', progress);
  };

  // 重置辨析题
  const resetQuiz = () => {
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">认知模块</h2>
        <p className="text-gray-600">通过思维模型、行业争议和辨析题，建立完整的数据分析认知体系</p>
      </div>

      {/* 标签页导航 */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'models' ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            onClick={() => setActiveTab('models')}
          >
            思维模型
          </button>
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'controversies' ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            onClick={() => setActiveTab('controversies')}
          >
            行业争议
          </button>
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'quiz' ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            onClick={() => setActiveTab('quiz')}
          >
            辨析题
          </button>
        </nav>
      </div>

      {/* 标签页内容 */}
      <div className="mt-6">
        {/* 思维模型 */}
        {activeTab === 'models' && (
          <div className="space-y-6">
            {thinkingModels.map(model => (
              <div key={model.id} className="bg-white rounded-lg shadow-card p-6">
                <h3 className="text-xl font-semibold mb-3">{model.title}</h3>
                <p className="text-gray-600 mb-4">{model.description}</p>
                <ul className="space-y-2">
                  {model.points.map((point, index) => (
                    <li key={index} className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* 行业争议 */}
        {activeTab === 'controversies' && (
          <div className="space-y-8">
            {industryControversies.map(controversy => (
              <div key={controversy.id} className="bg-white rounded-lg shadow-card p-6">
                <h3 className="text-xl font-semibold mb-3">{controversy.title}</h3>
                <p className="text-gray-600 mb-6">{controversy.description}</p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {controversy.arguments.map((arg, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-3 text-primary-600">{arg.side}</h4>
                      <ul className="space-y-2">
                        {arg.points.map((point, idx) => (
                          <li key={idx} className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                            <span className="text-gray-700 text-sm">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                
                <div className="bg-primary-50 p-4 rounded-lg border-l-4 border-primary-600">
                  <h4 className="font-medium mb-2">结论</h4>
                  <p className="text-gray-700">{controversy.conclusion}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 辨析题 */}
        {activeTab === 'quiz' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-card p-6">
              <h3 className="text-xl font-semibold mb-4">数据分析辨析题</h3>
              <p className="text-gray-600 mb-6">请回答以下问题，检验你对数据分析核心概念的理解。</p>
              
              <div className="space-y-8">
                {quizQuestions.map((question, index) => (
                  <div key={question.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                    <p className="font-medium mb-4">{index + 1}. {question.question}</p>
                    <div className="space-y-3">
                      {question.options.map((option, optionIndex) => (
                        <div key={optionIndex} className={`flex items-center p-3 rounded-lg cursor-pointer ${selectedAnswers[question.id] === optionIndex ? 'bg-primary-50 border border-primary-200' : 'hover:bg-gray-50'}`}>
                          <input 
                            type="radio" 
                            id={`${question.id}-option${optionIndex}`} 
                            name={question.id} 
                            checked={selectedAnswers[question.id] === optionIndex}
                            onChange={() => handleAnswerSelect(question.id, optionIndex)}
                            className="mr-3 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                          />
                          <label 
                            htmlFor={`${question.id}-option${optionIndex}`} 
                            className="flex-1 text-gray-700"
                          >
                            {option}
                          </label>
                          {showResults && (
                            <div className={`ml-2 ${selectedAnswers[question.id] === optionIndex ? (selectedAnswers[question.id] === question.correctAnswer ? 'text-green-500' : 'text-red-500') : ''}`}>
                              {selectedAnswers[question.id] === optionIndex && selectedAnswers[question.id] === question.correctAnswer && (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                              {selectedAnswers[question.id] === optionIndex && selectedAnswers[question.id] !== question.correctAnswer && (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    {showResults && (
                      <div className={`mt-4 p-3 rounded-lg ${selectedAnswers[question.id] === question.correctAnswer ? 'bg-green-50' : 'bg-red-50'}`}>
                        <p className="text-sm text-gray-700">{question.explanation}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-8 flex space-x-4">
                {!showResults ? (
                  <button 
                    onClick={handleSubmitQuiz} 
                    className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors flex-1"
                  >
                    提交答案
                  </button>
                ) : (
                  <>
                    <div className="flex-1 bg-primary-50 p-4 rounded-lg text-center">
                      <p className="font-medium text-primary-700">得分：{score}/{quizQuestions.length}</p>
                      <p className="text-sm text-gray-600 mt-1">{score === quizQuestions.length ? '优秀！你对数据分析概念理解深刻。' : score >= quizQuestions.length * 0.6 ? '不错！继续努力提升你的数据分析认知。' : '需要加强对数据分析核心概念的理解。'}</p>
                    </div>
                    <button 
                      onClick={resetQuiz} 
                      className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      重新答题
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cognition;