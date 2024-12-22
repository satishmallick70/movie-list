import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Movies from './container/movies';
import AddMovie from './components/AddMovie';
import FavoritesPage from './pages/FavoritesPage';

export default function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Movies />} /> {/* Use element prop to pass the component */}
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/add-movie" element={<AddMovie />} />
      </Routes>
      <Footer />
    </div>
  );
}
