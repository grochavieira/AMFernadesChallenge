import React, { useState, useEffect } from "react";

import * as sortings from "../../utils/sortings";
import IBuilding from "../../interfaces/IBuilding";
import BuildingCard from "../../components/BuildingCard";
import Pagination from "../../components/Pagination";
import api from "../../services/api";
import "./styles.scss";
import { FaSort } from "react-icons/fa";

const Home: React.FC = () => {
  const [buildings, setBuildings] = useState<IBuilding[]>([]);
  const [originalBuildings, setOriginalBuildings] = useState<IBuilding[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [range, setRange] = useState({
    initial: 0,
    final: 10,
  });
  const [activeSort, setActiveSort] = useState<string>("");
  const [sortType, setSortType] = useState("ascending");
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

  function hasKey<O>(obj: O, key: keyof any): key is keyof O {
    return key in obj;
  }

  function sortItems() {
    if (hasKey(sortings, activeSort)) {
      const sortFunction = sortings[activeSort];
      const sortedBuildings = sortFunction(originalBuildings, sortType);
      setBuildings(sortedBuildings);
    } else {
      alert("Por favor, selecione um dos campos acima para ordenar os dados!");
    }
  }

  return (
    <div className="home">
      <div className="home__header">
        <h1 className="home__header__title">Desafio AM Fernades</h1>
        <p className="home__header__description">
          Selecione o campo que deve ser ordenado e o tipo de ordenação:
        </p>

        <div className="home__header__options">
          <div className="home__header__options__items">
            <button
              className={activeSort === "name" ? "selected" : ""}
              onClick={() => setActiveSort("name")}
            >
              NOME
            </button>
            <button
              className={activeSort === "city" ? "selected" : ""}
              onClick={() => setActiveSort("city")}
            >
              CIDADE
            </button>
            <button
              className={activeSort === "neighborhood" ? "selected" : ""}
              onClick={() => setActiveSort("neighborhood")}
            >
              BAIRRO
            </button>
            <button
              className={activeSort === "street" ? "selected" : ""}
              onClick={() => setActiveSort("street")}
            >
              RUA
            </button>
            <button
              className={activeSort === "price" ? "selected" : ""}
              onClick={() => setActiveSort("price")}
            >
              PREÇO
            </button>
          </div>
          <div className="home__header__options__type">
            <button
              onClick={() => setSortType("ascending")}
              className={sortType === "ascending" ? "active" : ""}
            >
              CRESCENTE
            </button>
            <button
              onClick={() => setSortType("descending")}
              className={sortType === "descending" ? "active" : ""}
            >
              DECRESCENTE
            </button>
          </div>
          <div className="home__header__options__search">
            <button onClick={sortItems}>
              <FaSort /> ORDENAR ITEMS
            </button>
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
