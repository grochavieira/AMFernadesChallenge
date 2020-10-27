import React, { useState, useEffect } from "react";

import * as sortings from "../../utils/sortings";
import IBuilding from "../../interfaces/IBuilding";
import BuildingCard from "../../components/BuildingCard";
import api from "../../services/api";
import "./styles.scss";

const Home: React.FC = () => {
  const [buildings, setBuildings] = useState<IBuilding[]>([]);
  const [originalBuildings, setOriginalBuildings] = useState<IBuilding[]>([]);

  useEffect(() => {
    async function loadBuildings() {
      let { data } = await api.get("/imoveis");
      data = data.map((item: IBuilding) => {
        if (item.nome === "Move") {
          item.planta.preco = 1000000;
        }
        return item;
      });
      setBuildings(data);
      setOriginalBuildings([...data]);
      console.log(data);
    }

    loadBuildings();
  }, []);

  return (
    <div className="home">
      <h1 className="home__title">Desafio AM Fernades</h1>
      <p className="home__description">
        {" "}
        Escolha uma das opções abaixo para realizar a ordenação dos dados{" "}
      </p>

      <div className="home__options">
        <button onClick={() => setBuildings(sortings.name(originalBuildings))}>
          NOME
        </button>
        <button onClick={() => setBuildings(sortings.city(originalBuildings))}>
          CIDADE
        </button>
        <button
          onClick={() => setBuildings(sortings.neighborhood(originalBuildings))}
        >
          BAIRRO
        </button>
        <button
          onClick={() => setBuildings(sortings.street(originalBuildings))}
        >
          RUA
        </button>
      </div>

      <div className="home__buildings">
        {buildings.slice(0, 10).map((building: IBuilding) => (
          <BuildingCard key={`${building.fachada}`} building={building} />
        ))}
      </div>
    </div>
  );
};

export default Home;
