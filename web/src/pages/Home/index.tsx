import React, { useState, useEffect } from "react";

import * as sortings from "../../utils/sortings";
import IBuilding from "../../interfaces/IBuilding";
import BuildingCard from "../../components/BuildingCard";
import SortButton from "../../components/SortButton";
import Pagination from "../../components/Pagination";
import api from "../../services/api";
import "./styles.scss";

const Home: React.FC = () => {
  const [buildings, setBuildings] = useState<IBuilding[]>([]);
  const [originalBuildings, setOriginalBuildings] = useState<IBuilding[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [range, setRange] = useState({
    initial: 0,
    final: 10,
  });
  const limitPerPage = 10;

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
      setTotalItems(data.length);
      setCurrentPage(1);
      console.log(data);
    }

    loadBuildings();
  }, []);

  useEffect(() => {
    const initial = currentPage * limitPerPage - limitPerPage;
    const final = currentPage * limitPerPage;
    setRange({ initial, final });
    console.log(range);
    console.log(totalItems);
  }, [currentPage]);

  function goBack() {
    if (currentPage > 1) {
      const previousPage = currentPage - 1;
      setCurrentPage(previousPage);
    }
    window.scrollTo(0, 0);
  }

  function goForward() {
    if (currentPage < Math.ceil(totalItems / limitPerPage)) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
    }
    window.scrollTo(0, 0);
  }

  return (
    <div className="home">
      <div className="home__header">
        <h1 className="home__header__title">Desafio AM Fernades</h1>
        <p className="home__header__description">
          Escolha uma das opções abaixo para realizar a ordenação dos dados{" "}
        </p>

        <div className="home__header__options">
          <SortButton
            name="NOME"
            onAction={() => setBuildings(sortings.name(originalBuildings))}
          />
          <SortButton
            name="CIDADE"
            onAction={() => setBuildings(sortings.city(originalBuildings))}
          />
          <SortButton
            name="BAIRRO"
            onAction={() =>
              setBuildings(sortings.neighborhood(originalBuildings))
            }
          />
          <SortButton
            name="RUA"
            onAction={() => setBuildings(sortings.street(originalBuildings))}
          />
        </div>
      </div>

      <div className="home__buildings">
        {buildings
          .slice(range.initial, range.final)
          .map((building: IBuilding) => (
            <BuildingCard key={`${building.fachada}`} building={building} />
          ))}
      </div>
      <Pagination
        setCurrentPage={setCurrentPage}
        totalItems={totalItems}
        currentPage={currentPage}
        goBack={goBack}
        goForward={goForward}
        limitPerPage={limitPerPage}
      />
    </div>
  );
};

export default Home;
