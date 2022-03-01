import './App.css';
import { useState, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProjectPost from './components/projects/ProjectPost/ProjectPost';
import Article from './components/News/Article/Article';
import Home from './components/Home/Home';
import Partners from './components/Partners/Partners';
import AboutUs from './components/AboutUs/AboutUs';
import Footer from './components/Footer/Footer';
import TopNavbar from './components/navbar/TopNavbar';
import Admin from './components/Admin/Admin';

export const languageContext = createContext('');

function App() {
  const [language, setLanguage] = useState('am');

  return (
    <div className="App">
      <languageContext.Provider value={{ language }}>
        <TopNavbar lang={(val) => setLanguage(val)} language={language} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="/project/:id" element={<ProjectPost />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/admin" element={<Admin />} />
        </Routes >
        <Footer />
      </languageContext.Provider>
    </div>
  );
}

export default App; 
