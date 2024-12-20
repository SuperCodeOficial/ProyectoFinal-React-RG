import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PokemonList from "./PokemonList";
import PokemonDetails from "./PokemonDetails";
import Favorites from "./Favorites";
import HeaderSite from "./Header";
import Footer from "./Footer";


const App = () => {
  const [favorites, setFavorites] = useState(() => {
    // Cargar favoritos del localStorage al iniciar
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  // Guardar favoritos en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (pokemon) => {
    setFavorites((prevFavorites) => {
      const isAlreadyFavorite = prevFavorites.some((fav) => fav.id === pokemon.id);
  
      if (isAlreadyFavorite) {
        // Si ya está en favoritos, quitarlo
        return prevFavorites.filter((fav) => fav.id !== pokemon.id);
      } else {
        // Si no está en favoritos, agregarlo
        return [
          ...prevFavorites,
          {
            id: pokemon.id,
            name: pokemon.name,
            types: pokemon.types,
            sprites: pokemon.sprites,
          },
        ];
      }
    });
  };
  
  return (
    <Router>
      <HeaderSite />
      <Routes>
        <Route
          path="/"
          element={<PokemonList toggleFavorite={toggleFavorite} favorites={favorites} />}
        />
        <Route
          path="/pokemon/:name"
          element={<PokemonDetails />}
        />
        <Route
          path="/favoritos"
          element={<Favorites favorites={favorites} toggleFavorite={toggleFavorite} />}
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
