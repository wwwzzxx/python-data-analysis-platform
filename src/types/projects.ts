// 项目难度级别
export type ProjectLevel = '初级' | '中级' | '高级' | '专家';

// 项目任务
export interface ProjectTask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  hint?: string; // AI提示词
}

// 项目数据
export interface Project {
  id: string;
  title: string;
  description: string;
  level: ProjectLevel;
  learningObjectives: string[];
  tasks: ProjectTask[];
  datasetCode: string; // 数据集生成代码
  evaluationCriteria: string[];
  estimatedTime: string; // 预计完成时间
  prerequisites: string[]; // 前置知识
}

// 项目进度
export interface ProjectProgress {
  code: string;
  completed: boolean;
  tasks: Record<string, boolean>;
  lastUpdated: number;
}
