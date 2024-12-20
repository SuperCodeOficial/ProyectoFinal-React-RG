import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, Text } from "recharts";

const PokemonDetails = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await response.json();
        setPokemon(data);
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
      }
    };

    fetchPokemonDetails();
  }, [name]);

  if (!pokemon) {
    return <p className="text-center mt-5">Cargando detalles del Pokémon...</p>;
  }

  const statsData = pokemon.stats.map((stat, index) => ({
    name: stat.stat.name,
    value: stat.base_stat,
    color: ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1", "#a4de6c"][index % 6], 
  }));

  return (
    <div className="container mt-4">
      <h2 className="mb-lg-5 text-center">Details <i>{pokemon.name}</i></h2>
      <div className="row">
        <div className="col-md-6 text-center">
          <h5 className="text-capitalize">ID: #{pokemon.id}</h5>
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
            className="img-fluid my-3"
            style={{ maxHeight: "240px" }} 
          />
          <div>
            {pokemon.types.map((type) => (
              <span
                key={type.type.name}
                className="badge bg-primary text-capitalize me-1"
              >
                {type.type.name}
              </span>
            ))}
          </div>
        </div>
        <div className="col-md-6">
          <h6 className="text-center">Habilidades</h6>
          <div className="chart-container d-flex justify-content-center">
            <BarChart width={400} height={300} data={statsData} barGap={10}>
              <XAxis dataKey="name" hide />
              <YAxis />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-light p-2 border rounded">
                        <p className="mb-0 text-capitalize">
                          <strong>{payload[0].payload.name}</strong>: {payload[0].value}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="value">
                {statsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
              {statsData.map((entry, index) => (
                <Text
                  key={`text-${index}`}
                  x={(index + 0.5) * (400 / statsData.length)}
                  y={300 - entry.value * 1.5 - 10}
                  textAnchor="middle"
                  fill="#000"
                  fontSize={12}
                >
                  {entry.value}
                </Text>
              ))}
            </BarChart>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h6 className="text-center">Detalles adicionales</h6>
        <table className="table table-striped">
          <tbody>
            <tr>
              <th scope="row">Altura</th>
              <td>{pokemon.height / 10} m</td>
            </tr>
            <tr>
              <th scope="row">Peso</th>
              <td>{pokemon.weight / 10} kg</td>
            </tr>
            <tr>
              <th scope="row">Experiencia base</th>
              <td>{pokemon.base_experience}</td>
            </tr>
            <tr>
              <th scope="row">Habilidades</th>
              <td>
                {pokemon.abilities.map((ability) => (
                  <span
                    key={ability.ability.name}
                    className="badge bg-secondary text-capitalize me-1"
                  >
                    {ability.ability.name}
                  </span>
                ))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PokemonDetails;