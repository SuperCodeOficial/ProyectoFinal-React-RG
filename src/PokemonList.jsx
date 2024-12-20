import React, { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard"; 
import PokemonFilter from "./PokemonFilter"; 
import "bootstrap/dist/css/bootstrap.min.css";

const PokemonList = ({ toggleFavorite, favorites }) => {
  const [pokemons, setPokemons] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 12; 
  const [searchTerm, setSearchTerm] = useState(""); 
  const [filterType, setFilterType] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [availableFilters, setAvailableFilters] = useState({
    types: [],
    abilities: [],
  }); 
  const fetchPokemons = async () => {
    try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=21");
      const data = await response.json();

      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          return await res.json();
        })
      );
      const types = new Set();
      const abilities = new Set();
      pokemonDetails.forEach((pokemon) => {
        pokemon.types.forEach((type) => types.add(type.type.name));
        pokemon.abilities.forEach((ability) => abilities.add(ability.ability.name));
      });

      setAvailableFilters({
        types: Array.from(types),
        abilities: Array.from(abilities),
      });

      setPokemons(pokemonDetails);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  const filteredPokemons = pokemons.filter((pokemon) => {
    const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    let matchesFilter = true;

    if (filterType && filterValue) {
      switch (filterType) {
        case "type":
          matchesFilter = pokemon.types.some((type) => type.type.name === filterValue);
          break;
        case "ability":
          matchesFilter = pokemon.abilities.some((ability) => ability.ability.name === filterValue);
          break;
        default:
          matchesFilter = true;
      }
    }
    return matchesSearch && matchesFilter;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPokemons = filteredPokemons.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <p className="text-center mt-5">Cargando Pokémon...</p>;
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Lista de Pokémon</h1>
      <div className="row mb-4">
        <div className="col-md-12">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <PokemonFilter
        availableFilters={availableFilters}
        filterType={filterType}
        setFilterType={setFilterType}
        filterValue={filterValue}
        setFilterValue={setFilterValue}
      />
      <div className="row">
        {currentPokemons.map((pokemon) => (
          <div className="col-md-6 col-lg-4 mb-3" key={pokemon.id}>
            <PokemonCard
              id={pokemon.id}
              name={pokemon.name}
              types={pokemon.types.map((typeInfo) => typeInfo.type.name)}
              image={pokemon.sprites.front_default}
              toggleFavorite={toggleFavorite}
              isFavorite={favorites.some((fav) => fav.id === pokemon.id)}
            />
          </div>
        ))}
      </div>
      <nav>
        <ul className="pagination justify-content-center">
          {Array.from({ length: Math.ceil(filteredPokemons.length / itemsPerPage) }).map(
            (_, index) => (
              <li
                key={index}
                className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
              >
                <button className="page-link" onClick={() => paginate(index + 1)}>
                  {index + 1}
                </button>
              </li>
            )
          )}
        </ul>
      </nav>
    </div>
  );
};
export default PokemonList;
