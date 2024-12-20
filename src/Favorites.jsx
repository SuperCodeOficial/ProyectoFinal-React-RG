import React from "react";
import PokemonCard from "./PokemonCard";

const Favorites = ({ favorites, toggleFavorite }) => {
  console.log("Contenido de favoritos:", favorites);

  if (!favorites || favorites.length === 0) {
    return <p className="text-center mt-5">No tienes Pokémon en favoritos.</p>;
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Pokémon Favoritos</h1>
      <div className="row">
        {favorites.map((pokemon) => {
          if (!pokemon || !pokemon.name || !pokemon.sprites || !pokemon.types) {
            console.warn("Pokemon inválido en favoritos:", pokemon);
            return null;
          }

          return (
            <div className="col-md-6 col-lg-4 mb-3" key={pokemon.id}>
              <PokemonCard
                id={pokemon.id}
                name={pokemon.name}
                types={pokemon.types}
                image={pokemon.sprites.front_default}
                isFavorite={true}
                toggleFavorite={() => toggleFavorite(pokemon)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Favorites;
