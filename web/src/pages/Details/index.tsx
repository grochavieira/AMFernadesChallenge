import React, { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import { GridLoader } from "react-spinners";

import IBuilding from "../../interfaces/IBuilding";
import "./styles.scss";

interface DetailsProps {
  location: { state: { building: IBuilding } };
}

const Details: React.FC<DetailsProps> = ({
  location: {
    state: { building },
  },
}) => {
  const { goBack } = useHistory();
  const [isLoadingBuilding, setIsLoadingBuilding] = useState(true);

  useEffect(() => {
    setIsLoadingBuilding(true);
    setTimeout(() => {
      setIsLoadingBuilding(false);
    }, 1000);
  }, []);

  return (
    <div className="details">
      <div className="details__loading">
        <GridLoader size={60} loading={isLoadingBuilding} />
      </div>
      {!isLoadingBuilding ? (
        <main className="details__main">
          <button onClick={goBack} className="details__main__goback">
            <FiArrowLeft />
          </button>
          <div className="details__main__image">
            <img src={building.fachada} alt={building.nome} />
          </div>
          <div className="details__main__info">
            <div className="details__main__info__label">
              <h1>{building.nome}</h1>
            </div>
            <div className="details__main__info__label">
              <h2>Planta</h2>

              <p className="details__main__info__label__plan">
                <strong>Dormitório(s): </strong>
                {building.planta.dorms
                  ? building.planta.dorms
                  : "Informação indisponível"}
                <br />
                <strong>Metragem: </strong>
                {building.planta.metragem
                  ? `${building.planta.metragem} m²`
                  : "Informação indisponível"}
                <br />
                <strong>Preço: </strong>
                {typeof building.planta.preco === "number" &&
                building.planta.preco !== 0
                  ? `R$ ${building.planta.preco}`
                  : "Informação indisponível"}
                <br />
                <strong>Vagas: </strong>
                {building.planta.vagas
                  ? building.planta.vagas
                  : "Informação indisponível"}
                <br />
              </p>
            </div>
            <div className="details__main__info__label">
              <h2>Localização</h2>
              <p className="details__main__info__label__address">
                <strong>Cidade: </strong>
                {building.cidade ? building.cidade : "Informação indisponível"}
                <br />
                <strong>Bairro: </strong>
                {building.bairro ? building.bairro : "Informação indisponível"}
                <br />
                <strong>Rua: </strong>
                {building.rua ? building.rua : "Informação indisponível"}
                <strong> n° </strong>
                {building.num ? building.num : "Informação indisponível"} <br />
                <strong>CEP: </strong>
                {building.cep ? building.cep : "Informação indisponível"}
              </p>

              {building.location &&
              building.location._lat &&
              building.location._long ? (
                <a
                  className="details__main__info__label__route"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${building.location._lat},${building.location._long}`}
                >
                  Ver rotas no Google Maps
                </a>
              ) : (
                ""
              )}
            </div>
          </div>
        </main>
      ) : (
        ""
      )}
    </div>
  );
};

export default Details;
