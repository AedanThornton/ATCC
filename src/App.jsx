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
import cardCache from "./hooks/cardCache";

const App = () => {
  const fetchCardsByIds = async (cardIDsList) => {
    const searchString = "id:" + cardIDsList.join("||id:")

    const apiBase = import.meta.env.PROD
      ? import.meta.env.VITE_API_BASE_URL
      : '';
    const apiUrl = `${apiBase}/api/cards/?q=${searchString}`;    

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (e) {
      console.error("Error fetching card:", e);
    }
  };

  useEffect(() => {
    async function hydrate() {
      const saved = localStorage.getItem("backpack");
      const backpackChildren = saved ? JSON.parse(saved) : [];
      const missing = backpackChildren.filter(
        id => !cardCache.has(id)
      );

      if (missing.length === 0) return;

      const data = await fetchCardsByIds(missing);      

      for (const card of data.cards) {
        cardCache.set(card.cardIDs[0], card);
      }
    }

    hydrate();
  }, []);

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
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;