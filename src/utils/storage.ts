// 学习进度类型定义
export interface ProjectProgress {
  code: string; // 用户编写的代码
  completed: boolean; // 是否完成
  lastUpdated: number; // 最后更新时间
}

// 存储单个项目进度
export const saveProjectProgress = (projectId: string, progress: Omit<ProjectProgress, 'lastUpdated'>) => {
  const allProgress = JSON.parse(localStorage.getItem('learningProgress') || '{}');
  allProgress[projectId] = {
    ...progress,
    lastUpdated: Date.now()
  };
  localStorage.setItem('learningProgress', JSON.stringify(allProgress));
  checkStorageLimit();
};

// 获取单个项目进度
export const getProjectProgress = (projectId: string): ProjectProgress => {
  const allProgress = JSON.parse(localStorage.getItem('learningProgress') || '{}');
  return allProgress[projectId] || { code: '', completed: false, lastUpdated: 0 };
};

// 获取所有项目进度
export const getAllProgress = (): Record<string, ProjectProgress> => {
  return JSON.parse(localStorage.getItem('learningProgress') || '{}');
};

// 代码草稿类型定义
export interface CodeDraft {
  code: string; // 代码内容
  lastUpdated: number; // 最后更新时间
}

// 存储代码草稿
export const saveCodeDraft = (projectId: string, code: string) => {
  const allDrafts = JSON.parse(localStorage.getItem('codeDrafts') || '{}');
  allDrafts[projectId] = {
    code,
    lastUpdated: Date.now()
  };
  localStorage.setItem('codeDrafts', JSON.stringify(allDrafts));
  checkStorageLimit();
};

// 获取代码草稿
export const getCodeDraft = (projectId: string): string => {
  const allDrafts = JSON.parse(localStorage.getItem('codeDrafts') || '{}');
  return allDrafts[projectId]?.code || '';
};

// 存储AI聊天记录
export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export const saveChatMessages = (projectId: string, messages: ChatMessage[]) => {
  const allChats = JSON.parse(localStorage.getItem('chatMessages') || '{}');
  allChats[projectId] = messages;
  localStorage.setItem('chatMessages', JSON.stringify(allChats));
  checkStorageLimit();
};

export const getChatMessages = (projectId: string): ChatMessage[] => {
  const allChats = JSON.parse(localStorage.getItem('chatMessages') || '{}');
  return allChats[projectId] || [];
};

// 检查LocalStorage存储限制
const checkStorageLimit = () => {
  // 计算当前存储使用量
  const totalSize = Object.keys(localStorage).reduce((acc, key) => {
    return acc + localStorage.getItem(key)!.length;
  }, 0);
  
  // 8MB 限制 (8 * 1024 * 1024 = 8388608 字节)
  const limit = 8 * 1024 * 1024;
  
  // 如果超过80%的限制，清理旧数据
  if (totalSize > limit * 0.8) {
    cleanUpOldData();
  }
};

// 清理旧数据
const cleanUpOldData = () => {
  // 1. 清理旧的聊天记录（保留最近的50条消息）
  const allChats = JSON.parse(localStorage.getItem('chatMessages') || '{}');
  Object.keys(allChats).forEach(projectId => {
    const messages = allChats[projectId];
    if (messages.length > 50) {
      allChats[projectId] = messages.slice(-50); // 保留最近的50条
    }
  });
  localStorage.setItem('chatMessages', JSON.stringify(allChats));
  
  // 2. 清理30天前的代码草稿
  const allDrafts = JSON.parse(localStorage.getItem('codeDrafts') || '{}');
  const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
  Object.keys(allDrafts).forEach(projectId => {
    if (allDrafts[projectId].lastUpdated < thirtyDaysAgo) {
      delete allDrafts[projectId];
    }
  });
  localStorage.setItem('codeDrafts', JSON.stringify(allDrafts));
};

// 清除所有存储数据（用于调试或重置）
export const clearAllStorage = () => {
  localStorage.removeItem('learningProgress');
  localStorage.removeItem('codeDrafts');
  localStorage.removeItem('chatMessages');
};

// 获取存储使用情况
export const getStorageUsage = () => {
  const totalSize = Object.keys(localStorage).reduce((acc, key) => {
    return acc + localStorage.getItem(key)!.length;
  }, 0);
  const limit = 8 * 1024 * 1024; // 8MB
  return {
    used: totalSize,
    limit,
    percentage: (totalSize / limit) * 100
  };
};