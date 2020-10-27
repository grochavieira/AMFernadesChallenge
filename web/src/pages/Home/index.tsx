import React, { useState, useEffect } from "react";
import api from "../../services/api";
import "./styles.scss";

const Home: React.FC = () => {
  const [buildings, setBuildings] = useState({});

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
      <h1 className="title">Desafio AM Fernades</h1>
    </div>
  );
};

export default Home;
