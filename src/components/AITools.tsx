import React from 'react';

interface AIToolsProps {
  onToolClick: (toolType: 'hint' | 'debug' | 'error', context?: string) => void;
  isLoading: boolean;
}

const AITools: React.FC<AIToolsProps> = ({ onToolClick, isLoading }) => {
  return (
    <div className="space-y-3">
      <h4 className="font-medium text-sm text-gray-600">AI工具</h4>
      <div className="grid grid-cols-1 gap-2">
        <button
          onClick={() => onToolClick('hint')}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          思路点拨
        </button>
        <button
          onClick={() => onToolClick('debug')}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          代码检查
        </button>
        <button
          onClick={() => onToolClick('error')}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          错误分析
        </button>
      </div>
    </div>
  );
};

export default AITools;