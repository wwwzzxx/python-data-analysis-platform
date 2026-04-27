import React from 'react';
import { getProjects } from '../data/projects';
import { Project } from '../types/projects';

const Projects: React.FC = () => {
  const projects = getProjects();

  const getLevelColor = (level: Project['level']) => {
    switch (level) {
      case '初级': return 'bg-green-100 text-green-800';
      case '中级': return 'bg-blue-100 text-blue-800';
      case '高级': return 'bg-purple-100 text-purple-800';
      case '专家': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">项目列表</h2>
        <p className="text-gray-600">共 {projects.length} 个项目，从初级到专家级</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project: Project) => (
          <div key={project.id} className="bg-white rounded-lg shadow-card hover:shadow-card-hover transition-shadow overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold">{project.title}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(project.level)}`}>
                  {project.level}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="mb-4 text-sm text-gray-500">
                <div className="flex items-center mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {project.estimatedTime}
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {project.tasks.length} 个任务
                </div>
              </div>
              <a href={`/project/${project.id}`} className="text-primary-600 hover:text-primary-700 font-medium flex items-center">
                开始学习
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;