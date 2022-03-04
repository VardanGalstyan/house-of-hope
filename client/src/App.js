import './App.css';
import ls from 'localstorage-slim'
import { useState, createContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProjectPost from './components/projects/ProjectPost/ProjectPost';
import Article from './components/News/Article/Article';
import Home from './components/Home/Home';
import Partners from './components/Partners/Partners';
import AboutUs from './components/AboutUs/AboutUs';
import Footer from './components/Footer/Footer';
import TopNavbar from './components/navbar/TopNavbar';
import Admin from './components/Admin/Admin';

export const languageContext = createContext('');
export const adminContext = createContext(false);

function App() {

  const admin = ls.get('house_admin')
  const storedLanguage = ls.get('language')
  const [language, setLanguage] = useState(storedLanguage ? storedLanguage : 'am');
  const [isAdmin, setIsAdmin] = useState(admin ? admin : false);

  return (
    <div className="App">
      <adminContext.Provider value={{ isAdmin, admin, setIsAdmin }}>
        <languageContext.Provider value={{ language }}>
          <TopNavbar lang={(val) => setLanguage(val)} language={language} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/article/:id" element={<Article />} />
            <Route path="/project/:id" element={<ProjectPost />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Navigate to={'/'} />} />
          </Routes >
          <Footer />
        </languageContext.Provider>
      </adminContext.Provider>
    </div >
  );
}

export default App; 
