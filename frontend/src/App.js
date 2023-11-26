import './App.css';
import Register from './components/Register';
import LoginPage from './components/LoginPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import HomePage from './components/HomePage';
import AdminHomePage from './components/AdminHomePage';
import Locations from './components/Locations';
import Books from './components/Books';
import Stores from './components/Stores';
import SearchBooks from './components/SearchBooks';
import MyBooks from './components/MyBooks';
function App() {
  return (
    <div>
      <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path='/home' element={<HomePage />}/>
                <Route path='/admin' element={<AdminHomePage />}/>
                <Route path='/admin/locations' element={<Locations />}/>
                <Route path='/admin/books' element={<Books />}/>
                <Route path='/admin/stores' element={<Stores />}/>
                <Route path='/search' element={<SearchBooks/>}/>
                <Route path='/mybooks' element={<MyBooks/>}/>
            </Routes>
        </Router>
        </div>
  );
}

export default App;
