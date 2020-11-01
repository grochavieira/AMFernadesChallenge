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
  const [activeSort, setActiveSort] = useState("");
  const limitPerPage = 10;

  useEffect(() => {
    async function loadBuildings() {
      let { data } = await api.get("/imoveis");
      const arrangeData = data.map((item: IBuilding) => {
        if (item.planta === undefined) {
          item.planta = {
            dorms: 0,
            metragem: 0,
            preco: 0,
            vagas: 0,
          };
        }
        item.nome = item.nome.trim();
        item.bairro = item.bairro.trim();
        item.rua = item.rua.trim();
        item.cidade = item.cidade.trim();
        return item;
      });

      const cleanedData = arrangeData.filter(
        (item: IBuilding, index: number) => {
          const indexOfItem = arrangeData.findIndex(
            (subitem: IBuilding) => subitem.nome === item.nome
          );
          return indexOfItem === index;
        }
      );
      setBuildings(cleanedData);
      setOriginalBuildings([...cleanedData]);
      setTotalItems(cleanedData.length);
      setCurrentPage(1);
      console.log(cleanedData);
    }

    loadBuildings();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
    window.scrollTo(0, 0);
  }, [buildings]);

  useEffect(() => {
    const initial = currentPage * limitPerPage - limitPerPage;
    const final = currentPage * limitPerPage;
    setRange({ initial, final });
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
          Escolha uma das opções abaixo para ordenar os dados:
        </p>

        <div className="home__header__options">
          <div className="home__header__options__first">
            <SortButton
              name="NOME"
              activeSort={activeSort}
              onAction={() => {
                setBuildings(sortings.name(originalBuildings));
                setActiveSort("NOME");
              }}
            />
            <SortButton
              name="CIDADE"
              activeSort={activeSort}
              onAction={() => {
                setBuildings(sortings.city(originalBuildings));
                setActiveSort("CIDADE");
              }}
            />
          </div>

          <div className="home__header__options__second">
            <SortButton
              name="BAIRRO"
              activeSort={activeSort}
              onAction={() => {
                setBuildings(sortings.neighborhood(originalBuildings));
                setActiveSort("BAIRRO");
              }}
            />
            <SortButton
              name="RUA"
              activeSort={activeSort}
              onAction={() => {
                setBuildings(sortings.street(originalBuildings));
                setActiveSort("RUA");
              }}
            />
            <SortButton
              name="PREÇO"
              activeSort={activeSort}
              onAction={() => {
                setBuildings(sortings.price(originalBuildings));
                setActiveSort("PREÇO");
              }}
            />
          </div>
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
