import React from "react";
import { FiArrowRight } from "react-icons/fi";

import "./styles.scss";

export interface Building {
  bairro: string;
  cep: string;
  cidade: string;
  fachada: string;
  // location: {
  //   _lat: -23.6706885;
  //   _long: -46.5379514;
  // };
  nome: string;
  num: string;
  rua: string;
  // planta: {
  //   dorms: 3;
  //   metragem: 76;
  //   preco: 465000;
  //   vagas: 2;
  // };
}

interface BuildingCardProps {
  building: Building;
}

const BuildingCard: React.FC<BuildingCardProps> = ({ building }) => {
  return (
    <div className="building-card">
      <div className="building-card__image">
        <img src={building.fachada} alt={building.nome} />
      </div>
      <div className="building-card__info">
        <h3 className="building-card__info__title">{building.nome}</h3>
        <p className="building-card__info__address">
          {building.cidade} - {building.bairro} <br /> {building.rua} n°
          {building.num}
        </p>

        <button className="building-card__info__details">
          Detalhes <FiArrowRight />{" "}
        </button>
      </div>
    </div>
  );
};

export default BuildingCard;
