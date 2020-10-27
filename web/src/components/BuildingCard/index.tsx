import React from "react";
import { FiArrowRight } from "react-icons/fi";

import IBuilding from "../../interfaces/IBuilding";
import "./styles.scss";

interface BuildingCardProps {
  building: IBuilding;
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
        <p className="building-card__info__price">
          {typeof building.planta.preco === "number"
            ? `R$ ${building.planta.preco}`
            : building.planta.preco}
        </p>

        <button className="building-card__info__details">
          Detalhes <FiArrowRight />{" "}
        </button>
      </div>
    </div>
  );
};

export default BuildingCard;
