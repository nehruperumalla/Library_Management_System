import './App.css';
import Register from './components/Register';
import LoginPage from './components/LoginPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
function App() {
  return (
    <div>
      <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </Router>
        </div>
  );
}

export default App;
