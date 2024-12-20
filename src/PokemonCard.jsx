import React from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PokemonCard = ({ id, name, types, image, toggleFavorite, isFavorite }) => {
  const navigate = useNavigate();

  return (
    <div className="card shadow mb-3 w-100">
      <div className="row g-0 align-items-center">
        <div className="col-4 col-md-3">
          <img
            src={image}
            alt={name}
            className="img-fluid rounded-start"
            style={{ objectFit: "cover", height: "100%" }}
          />
        </div>
        <div className="col-6 col-md-8">
          <div className="card-body">
            <h5 className="card-title text-capitalize">{name}</h5>
            <p className="card-text">
              {types.map((type, index) => (
                <span key={index} className="badge bg-primary me-1">
                  {type}
                </span>
              ))}
            </p>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigate(`/pokemon/${name}`)}
            >
              Ver más
            </button>
          </div>
        </div>
        <div className="col-2 col-md-1 d-flex justify-content-center align-items-center">
          <FaStar
            size={24}
            color={isFavorite ? "gold" : "gray"}
            style={{ cursor: "pointer" }}
            onClick={() =>
              toggleFavorite({
                id,
                name,
                types,
                sprites: { front_default: image },
              })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
