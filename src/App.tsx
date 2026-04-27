import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import Learning from './pages/Learning';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Cognition from './pages/Cognition';
import Profile from './pages/Profile';
import { preloadPyodide } from './utils/pyodide';

function App() {
  // 应用启动时预加载Pyodide
  useEffect(() => {
    preloadPyodide();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/learning" element={<Learning />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/cognition" element={<Cognition />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;