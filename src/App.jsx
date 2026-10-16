import "./styles/global.css";
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from "./architecture/layout/Layout" ;
import HomePage from './pages/home/HomePage';
import CardLibraryPage from './architecture/catalog/CardLibraryPage';
import AboutPage from './pages/about/AboutPage';
import FocusCardPage from './components/focuscard/FocusCardPage'
import NotFoundPage from './pages/404/NotFoundPage';
import SearchInfoPage from './architecture/catalog/components/searchinfo/SearchInfoPage'
import Backpack from "./architecture/editor/collections/Collections";
import { useAllCards } from "./hooks/useAllCards";

const App = () => {
  const { data, isLoading, error } = useAllCards()
  
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/card/:cardID" element={<FocusCardPage />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/home" replace />}/>
        <Route path="catalog" element={<CardLibraryPage />} />
        <Route path="backpack" element={<Backpack />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="search-info" element={<SearchInfoPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;