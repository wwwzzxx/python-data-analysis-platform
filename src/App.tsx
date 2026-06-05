
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Learning from './pages/Learning';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Cognition from './pages/Cognition';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/learning" element={<Learning />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/cognition" element={<Cognition />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;