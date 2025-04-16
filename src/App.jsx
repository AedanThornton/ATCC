import React from "react";
import "./styles/global.css";
import "./styles/main.css";
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CardLibraryPage from './pages/CardLibraryPage';
import AboutPage from './pages/AboutPage';
import FocusCardPage from './pages/FocusCardPage'
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/home" replace />}/>
        <Route path="catalog" element={<CardLibraryPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="/home" element={<HomePage />} />
      <Route path="/card/:cardID" element={<FocusCardPage />} />
    </Routes>
  );
};

export default App;