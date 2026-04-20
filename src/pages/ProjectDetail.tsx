import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { runPythonCode, getPyodideStatus } from '../utils/pyodide';
import { getProjectById } from '../data/projects';
import { Project, ProjectProgress } from '../types/projects';
import AITools from '../components/AITools';
import { saveChatMessages, getChatMessages, ChatMessage } from '../utils/storage';

interface ProjectDetailProps {
  projectId: string;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ projectId }) => {
  const [project, setProject] = useState<Project | undefined>(undefined);
  const [code, setCode] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [loadingStatus, setLoadingStatus] = useState<string>('');
  const [pyodideStatus, setPyodideStatus] = useState(getPyodideStatus());
  const [aiMessages, setAiMessages] = useState<ChatMessage[]>([]);
  const [aiInput, setAiInput] = useState<string>('');
  const [aiLoading, setAiLoading] = useState<boolean>(false);
  const [editorInstance, setEditorInstance] = useState<any>(null);
  const [taskStatus, setTaskStatus] = useState<Record<string, boolean>>({});
  const [projectCompleted, setProjectCompleted] = useState<boolean>(false);

  // 初始化项目数据
  useEffect(() => {
    const loadedProject = getProjectById(projectId);
    setProject(loadedProject);
    
    if (loadedProject) {
      // 加载项目进度
      loadProjectProgress();
      // 加载聊天记录
      const savedMessages = getChatMessages(projectId);
      setAiMessages(savedMessages);
      // 初始化任务状态
      const initialTaskStatus: Record<string, boolean> = {};
      loadedProject.tasks.forEach(task => {
        initialTaskStatus[task.id] = false;
      });
      setTaskStatus(initialTaskStatus);
      // 设置默认代码为数据集生成代码
      setCode(loadedProject.datasetCode);
    }
  }, [projectId]);

  // 加载项目进度
  const loadProjectProgress = () => {
    const progressStr = localStorage.getItem(`project_${projectId}_progress`);
    if (progressStr) {
      try {
        const progress: ProjectProgress = JSON.parse(progressStr);
        setCode(progress.code);
        setTaskStatus(progress.tasks || {});
        setProjectCompleted(progress.completed);
      } catch (error) {
        console.error('加载进度失败:', error);
      }
    }
  };

  // 保存项目进度
  const saveProjectProgress = () => {
    const progress: ProjectProgress = {
      code,
      completed: projectCompleted,
      tasks: taskStatus,
      lastUpdated: Date.now()
    };
    localStorage.setItem(`project_${projectId}_progress`, JSON.stringify(progress));
  };

  // 当代码或任务状态改变时保存进度
  useEffect(() => {
    if (project) {
      saveProjectProgress();
    }
  }, [code, taskStatus, projectCompleted, project]);

  // 当聊天记录变化时保存到LocalStorage
  useEffect(() => {
    if (project) {
      saveChatMessages(projectId, aiMessages);
    }
  }, [aiMessages, projectId, project]);

  // 初始化编辑器
  const handleEditorDidMount = (editor: any) => {
    setEditorInstance(editor);
  };

  // 格式化代码
  const handleFormatCode = () => {
    if (editorInstance) {
      editorInstance.getAction('editor.action.formatDocument').run();
    }
  };

  // 清空代码
  const handleClearCode = () => {
    setCode('');
  };

  // 重置为数据集生成代码
  const handleResetCode = () => {
    if (project) {
      setCode(project.datasetCode);
    }
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput('运行中...');
    
    try {
      // 检查Pyodide状态
      const status = getPyodideStatus();
      setPyodideStatus(status);
      
      if (status.loading) {
        setLoadingStatus('正在初始化Python环境...');
      }
      
      // 运行Python代码
      const result = await runPythonCode(code);
      
      if (result.success) {
        // 处理输出结果
        let outputText = '';
        if (result.result !== undefined) {
          outputText = String(result.result);
        }
        setOutput(outputText);
      } else {
        setOutput(`错误: ${result.error}\n\n详细信息: ${result.details || '无'}`);
      }
    } catch (error) {
      setOutput(`运行时错误: ${(error as Error).message}`);
    } finally {
      setIsRunning(false);
      setLoadingStatus('');
      setPyodideStatus(getPyodideStatus());
    }
  };

  const handleAiRequest = async (messages: { role: 'user' | 'assistant', content: string }[]) => {
    setAiLoading(true);
    
    try {
      // 调用Workers API
      const response = await fetch('https://python-data-analysis-platform.example.workers.dev/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages })
      });
      
      if (response.ok) {
        const data = await response.json();
        const aiResponse: ChatMessage = { 
          role: 'assistant', 
          content: data.choices[0].message.content,
          timestamp: Date.now()
        };
        setAiMessages(prev => [...prev, aiResponse]);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'AI请求失败');
      }
    } catch (error) {
      console.error('AI请求失败:', error);
      const errorMessage: ChatMessage = { 
        role: 'assistant', 
        content: '抱歉，AI服务暂时不可用，请稍后再试。',
        timestamp: Date.now()
      };
      setAiMessages(prev => [...prev, errorMessage]);
    } finally {
      setAiLoading(false);
    }
  };

  const handleAiSubmit = async () => {
    if (aiInput.trim()) {
      const newMessage: ChatMessage = { 
        role: 'user', 
        content: aiInput,
        timestamp: Date.now()
      };
      setAiMessages([...aiMessages, newMessage]);
      setAiInput('');
      await handleAiRequest([{ role: 'user', content: aiInput }]);
    }
  };

  const handleAiToolClick = async (toolType: 'hint' | 'debug' | 'error', context?: string) => {
    let userMessage = '';
    
    switch (toolType) {
      case 'hint':
        userMessage = `我在项目 ${project?.title} 中遇到了问题，需要思路点拨。当前代码：\n\n${code}`;
        break;
      case 'debug':
        userMessage = `请帮我检查这段代码是否有问题：\n\n${code}`;
        break;
      case 'error':
        userMessage = `我的代码运行出错了，错误信息：\n\n${output}\n\n代码：\n\n${code}`;
        break;
    }
    
    const newMessage: ChatMessage = { 
      role: 'user', 
      content: userMessage,
      timestamp: Date.now()
    };
    setAiMessages([...aiMessages, newMessage]);
    await handleAiRequest([{ role: 'user', content: userMessage }]);
  };

  // 切换任务完成状态
  const toggleTaskStatus = (taskId: string) => {
    setTaskStatus(prev => {
      const newStatus = { ...prev, [taskId]: !prev[taskId] };
      // 检查是否所有任务都完成
      const allTasksCompleted = Object.values(newStatus).every(completed => completed);
      setProjectCompleted(allTasksCompleted);
      return newStatus;
    });
  };

  // 获取难度颜色
  const getLevelColor = (level: Project['level']) => {
    switch (level) {
      case '初级': return 'bg-green-100 text-green-800';
      case '中级': return 'bg-blue-100 text-blue-800';
      case '高级': return 'bg-purple-100 text-purple-800';
      case '专家': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!project) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <svg className="h-12 w-12 mx-auto mb-4 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900">项目不存在</h3>
          <p className="text-gray-500 mt-2">请检查项目ID是否正确</p>
          <a href="/projects" className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
            返回项目列表
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* 项目头部信息 */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-wrap justify-between items-start gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold">项目 {project.id}: {project.title}</h2>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(project.level)}`}>
                {project.level}
              </span>
            </div>
            <p className="text-gray-600 mb-4">{project.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                预计完成时间: {project.estimatedTime}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {project.tasks.length} 个任务
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                完成状态: {projectCompleted ? '已完成' : '进行中'}
              </div>
            </div>
          </div>
          <div className="flex-shrink-0">
            <a href="/projects" className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              <svg className="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              返回项目列表
            </a>
          </div>
        </div>
      </div>

      {/* 学习目标 */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          学习目标
        </h3>
        <ul className="space-y-2">
          {project.learningObjectives.map((objective, index) => (
            <li key={index} className="flex items-start gap-2">
              <svg className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>{objective}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 任务清单 */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          任务清单
        </h3>
        <div className="space-y-3">
          {project.tasks.map((task) => (
            <div key={task.id} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <input
                type="checkbox"
                checked={taskStatus[task.id] || false}
                onChange={() => toggleTaskStatus(task.id)}
                className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{task.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                {task.hint && (
                  <div className="mt-2 text-xs text-gray-500 bg-gray-50 p-2 rounded">
                    <span className="font-medium">提示: </span>{task.hint}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 代码编辑器和AI陪练 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 代码编辑器 */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-wrap justify-between items-center gap-2">
            <h3 className="text-lg font-semibold">代码编辑器</h3>
            <div className="flex space-x-2">
              {!pyodideStatus.initialized && (
                <span className="text-sm text-gray-500">Python环境初始化中...</span>
              )}
              <button 
                onClick={handleClearCode}
                className="bg-gray-200 text-gray-800 px-3 py-1.5 rounded-lg hover:bg-gray-300 transition-colors text-sm"
              >
                清空
              </button>
              <button 
                onClick={handleFormatCode}
                className="bg-gray-200 text-gray-800 px-3 py-1.5 rounded-lg hover:bg-gray-300 transition-colors text-sm"
              >
                格式化
              </button>
              <button 
                onClick={handleResetCode}
                className="bg-gray-200 text-gray-800 px-3 py-1.5 rounded-lg hover:bg-gray-300 transition-colors text-sm"
              >
                重置数据集代码
              </button>
              <button 
                onClick={handleRunCode} 
                disabled={isRunning}
                className="bg-primary-600 text-white px-4 py-1.5 rounded-lg hover:bg-primary-700 transition-colors disabled:bg-gray-400 flex items-center gap-2"
              >
                {isRunning ? (
                  <>
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    运行中...
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    运行代码
                  </>
                )}
              </button>
            </div>
          </div>
          <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
            <Editor
              height="500px"
              language="python"
              value={code}
              onChange={(value) => setCode(value || '')}
              onMount={handleEditorDidMount}
              options={{
                minimap: { enabled: true },
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                theme: 'vs-dark',
                fontSize: 14,
                tabSize: 4,
                automaticLayout: true,
                scrollbar: {
                  vertical: 'auto',
                  horizontal: 'auto',
                  verticalScrollbarSize: 12,
                  horizontalScrollbarSize: 12
                },
                suggestOnTriggerCharacters: true,
                quickSuggestions: {
                  other: true,
                  comments: false,
                  strings: false
                },
                parameterHints: {
                  enabled: true
                },
                bracketPairColorization: {
                  enabled: true
                },
                wordWrap: 'on',
                folding: true
              }}
            />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              运行结果
            </h3>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 min-h-[250px] shadow">
              {loadingStatus && (
                <div className="flex items-center justify-center py-8 text-gray-500">
                  <svg className="animate-spin h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {loadingStatus}
                </div>
              )}
              {!loadingStatus && !output && (
                <div className="text-center py-8 text-gray-400">
                  <svg className="h-12 w-12 mx-auto mb-2 opacity-20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <p>运行代码后，结果将显示在这里</p>
                </div>
              )}
              {output && (
                <div className="space-y-4">
                  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <pre className="text-sm whitespace-pre-wrap font-mono">{output}</pre>
                  </div>
                  {/* 检查输出中是否包含图表数据 */}
                  {output.includes('data:image/png;base64,') && (
                    <div className="mt-4">
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        生成的图表
                      </h4>
                      <div className="bg-white border border-gray-200 rounded-lg p-4 flex justify-center shadow-sm">
                        <img 
                          src={output.match(/data:image\/png;base64,[^\n]+/g)?.[0] || ''} 
                          alt="图表" 
                          className="max-w-full h-auto rounded-lg shadow"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* AI陪练 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            AI陪练
          </h3>
          
          {/* AI工具 */}
          <AITools onToolClick={handleAiToolClick} isLoading={aiLoading} />
          
          <div className="bg-white border border-gray-200 rounded-lg h-[400px] overflow-y-auto p-4 space-y-4 shadow">
            {aiMessages.map((message, index) => (
              <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg shadow-sm ${message.role === 'user' ? 'bg-primary-100 text-primary-800' : 'bg-gray-100 text-gray-800'}`}>
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <div className="text-xs text-gray-500 mt-1">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
            {aiMessages.length === 0 && (
              <div className="text-center text-gray-400 py-8">
                <svg className="h-12 w-12 mx-auto mb-2 opacity-20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <p>有问题随时问我，我会帮助你解决数据分析中的问题</p>
              </div>
            )}
          </div>
          <div className="flex space-x-2">
            <input
              type="text"
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAiSubmit()}
              placeholder="输入你的问题..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-sm"
            />
            <button 
              onClick={handleAiSubmit}
              disabled={aiLoading}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors shadow-sm disabled:bg-gray-400 flex items-center justify-center"
            >
              {aiLoading ? (
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;