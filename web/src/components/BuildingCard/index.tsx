import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { useHistory } from "react-router-dom";

import IBuilding from "../../interfaces/IBuilding";
import "./styles.scss";

interface BuildingCardProps {
  building: IBuilding;
}

const BuildingCard: React.FC<BuildingCardProps> = ({ building }) => {
  const history = useHistory();

  if (building.planta === undefined) {
    building.planta = {
      dorms: 0,
      metragem: 0,
      preco: 0,
      vagas: 0,
    };
  }

  function navigateToDetails() {
    history.push("/details", { building });
  }

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
          {typeof building.planta.preco === "number" &&
          building.planta.preco !== 0
            ? `R$ ${building.planta.preco}`
            : "Preço indisponível"}
        </p>

        <button
          onClick={navigateToDetails}
          className="building-card__info__details"
        >
          Detalhes <FiArrowRight />{" "}
        </button>
      </div>
    </div>
  );
};

export default BuildingCard;
