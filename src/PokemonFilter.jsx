import React from "react";

const PokemonFilter = ({ availableFilters, filterType, setFilterType, filterValue, setFilterValue }) => {
  return (
    <div className="row mb-4">
      <div className="col-md-6">
        <select
          className="form-select"
          value={filterType}
          onChange={(e) => {
            setFilterType(e.target.value);
            setFilterValue("");
          }}
        >
          <option value="">Seleccionar filtro...</option>
          <option value="type">Tipo</option>
          <option value="ability">Habilidad</option>
        </select>
      </div>
      <div className="col-md-6">
        <select
          className="form-select"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          disabled={!filterType}
        >
          <option value="">Seleccionar valor...</option>
          {filterType === "type" &&
            availableFilters.types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          {filterType === "ability" &&
            availableFilters.abilities.map((ability) => (
              <option key={ability} value={ability}>
                {ability}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};

export default PokemonFilter;
