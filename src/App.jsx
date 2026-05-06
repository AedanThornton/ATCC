import React, { useEffect } from "react";
import "./styles/global.css";
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import CardLibraryPage from './pages/CardLibraryPage';
import AboutPage from './pages/AboutPage';
import FocusCardPage from './pages/FocusCardPage'
import NotFoundPage from './pages/NotFoundPage';
import SearchInfoPage from './pages/SearchInfoPage'
import SavedSetPage from "./pages/SavedSetPage";

const App = () => {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/card/:cardID" element={<FocusCardPage />} />
      <Route path="/" element={<Layout isCatalog={true}/>}>
        <Route index element={<Navigate to="/home" replace />}/>
        <Route path="catalog" element={<CardLibraryPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/home" replace />}/>
        <Route path="about" element={<AboutPage />} />
        <Route path="search-info" element={<SearchInfoPage />} />
        <Route path="savedsets" element={<SavedSetPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;