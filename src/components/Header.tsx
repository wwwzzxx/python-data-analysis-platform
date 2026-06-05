import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-primary-600 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-primary-600 font-bold">Py</span>
          </div>
          <h1 className="text-xl font-bold">Python数据分析AI训练平台</h1>
        </div>
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-primary-100 transition-colors">首页</Link>
          <Link to="/profile" className="hover:text-primary-100 transition-colors">个人主页</Link>
          <Link to="/projects" className="hover:text-primary-100 transition-colors">项目列表</Link>
          <Link to="/learning" className="hover:text-primary-100 transition-colors">学习引导</Link>
          <Link to="/cognition" className="hover:text-primary-100 transition-colors">认知模块</Link>
          <Link to="/about" className="hover:text-primary-100 transition-colors">关于平台</Link>
        </nav>
        <button 
          className="md:hidden" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "关闭菜单" : "打开菜单"}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      {/* 移动端菜单 */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-primary-700">
          <div className="container mx-auto px-4 py-2 space-y-2">
            <Link 
              to="/" 
              className="block py-2 hover:bg-primary-800 px-2 rounded transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              首页
            </Link>
            <Link 
              to="/profile" 
              className="block py-2 hover:bg-primary-800 px-2 rounded transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              个人主页
            </Link>
            <Link 
              to="/projects" 
              className="block py-2 hover:bg-primary-800 px-2 rounded transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              项目列表
            </Link>
            <Link 
              to="/learning" 
              className="block py-2 hover:bg-primary-800 px-2 rounded transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              学习引导
            </Link>
            <Link 
              to="/cognition" 
              className="block py-2 hover:bg-primary-800 px-2 rounded transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              认知模块
            </Link>
            <Link 
              to="/about" 
              className="block py-2 hover:bg-primary-800 px-2 rounded transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              关于平台
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;