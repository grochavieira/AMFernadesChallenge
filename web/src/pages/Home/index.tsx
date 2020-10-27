import React, { useState, useEffect } from "react";

import BuildingCard, { Building } from "../../components/BuildingCard";
import api from "../../services/api";
import "./styles.scss";

const Home: React.FC = () => {
  const [buildings, setBuildings] = useState<Building[]>([]);

  useEffect(() => {
    async function loadBuildings() {
      const { data } = await api.get("/imoveis");
      setBuildings(data);
      console.log(data);
    }

    loadBuildings();
  }, []);

  return (
    <div className="home">
      <h1 className="home__title">Desafio AM Fernades</h1>

      <div className="home__buildings">
        {buildings.slice(0, 10).map((building: Building) => (
          <BuildingCard building={building} />
        ))}
      </div>
    </div>
  );
};

export default Home;
